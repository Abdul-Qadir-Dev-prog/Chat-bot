const { detectIntent } = require("./intentService");
const { searchProducts, recommendProducts } = require("./productService");
const { getOrderByNumber } = require("./orderService");
const { findFaqMatch } = require("./faqService");
const { createTicket } = require("./supportService");
const { generateGeneralResponse } = require("./aiService");

const sessionStore = new Map();

function getSession(sessionId) {
  const current = sessionStore.get(sessionId) || {
    unresolvedCount: 0,
    history: [],
  };

  sessionStore.set(sessionId, current);
  return current;
}

function processMessage({ sessionId, message }) {
  const intent = detectIntent(message);
  const session = getSession(sessionId);

  session.history.push({ role: "user", content: message, intent, timestamp: new Date().toISOString() });

  let response = {
    reply: "",
    intent,
    actions: [],
  };

  if (intent === "greet") {
    response.reply = "Hi! I can help with products, orders, returns, payments, account issues, or connect you to human support.";
  } else if (intent === "product_search") {
    const results = searchProducts(message);
    response.reply = results.length
      ? `I found ${results.length} matching products.`
      : "I could not find an exact match. Share your budget or preferred category for better recommendations.";
    response.actions.push({ type: "products", data: results.slice(0, 3) });
  } else if (intent === "product_recommendation") {
    const category = /laptop|computer|coding/.test(message.toLowerCase()) ? "computers" : undefined;
    const maxPriceMatch = message.match(/\$?(\d{2,5})/);
    const maxPrice = maxPriceMatch ? Number(maxPriceMatch[1]) : undefined;
    const recommendations = recommendProducts({ category, maxPrice });
    response.reply = recommendations.length
      ? "Here are top recommendations based on what you asked."
      : "Please share your budget or use-case so I can suggest products.";
    response.actions.push({ type: "products", data: recommendations });
  } else if (intent === "order_tracking") {
    const orderNumber = message.match(/ORD-\d{4,}/i)?.[0];
    if (!orderNumber) {
      response.reply = "Please share your order number (for example: ORD-1001) so I can check the latest status.";
    } else {
      const order = getOrderByNumber(orderNumber);
      if (!order) {
        response.reply = `I couldn't find ${orderNumber}. Please double-check or share the email used at checkout.`;
      } else {
        response.reply = `Order ${order.orderNumber} is currently ${order.status}. Estimated delivery: ${order.estimatedDelivery}.`;
        response.actions.push({ type: "order", data: order });
      }
    }
  } else if (intent === "faq") {
    const faq = findFaqMatch(message);
    response.reply = faq
      ? faq.answer
      : "I can help with shipping, returns, payment methods, warranty, and account help. What would you like to know?";
  } else if (["returns_refunds", "payment_issue", "account_issue", "shipping", "complaint", "speak_to_agent"].includes(intent)) {
    const ticket = createTicket({
      sessionId,
      intent,
      priority: intent === "complaint" || intent === "payment_issue" ? "high" : "medium",
      summary: message,
    });
    response.reply = `I’m sorry you’re facing this. I created support ticket ${ticket.id} and can connect you to a human agent.`;
    response.actions.push({ type: "ticket", data: ticket });
    response.actions.push({ type: "handoff", data: { queue: "human_support", reason: intent } });
  } else if (intent === "goodbye") {
    response.reply = "You’re welcome. If you need anything else about products or support, I’m here for you.";
  } else {
    session.unresolvedCount += 1;
    const aiReply = generateGeneralResponse({ message, intent });
    response.reply = aiReply.text;
    response.actions.push({ type: "fallback", data: { unresolvedCount: session.unresolvedCount } });

    if (session.unresolvedCount >= 3) {
      const ticket = createTicket({
        sessionId,
        intent: "unresolved_general",
        summary: "User needs human assistance after repeated unclear requests",
        priority: "medium",
      });
      response.reply += ` I can escalate this now. Ticket: ${ticket.id}.`;
      response.actions.push({ type: "ticket", data: ticket });
      response.actions.push({ type: "handoff", data: { queue: "human_support", reason: "fallback_threshold" } });
      session.unresolvedCount = 0;
    }
  }

  session.history.push({ role: "bot", content: response.reply, intent, timestamp: new Date().toISOString() });

  return response;
}

module.exports = {
  processMessage,
};
