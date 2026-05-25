const { containsAny, normalizeText } = require("../utils/messageUtils");

const intentRules = [
  { intent: "greet", keywords: ["hi", "hello", "hey", "good morning", "good evening"] },
  { intent: "product_search", keywords: ["find", "search", "show", "looking for", "product", "buy"] },
  { intent: "product_recommendation", keywords: ["recommend", "suggest", "best", "budget", "for me"] },
  { intent: "faq", keywords: ["policy", "warranty", "faq", "how long", "payment methods"] },
  { intent: "order_tracking", keywords: ["where is my order", "track", "tracking", "order status", "shipped"] },
  { intent: "returns_refunds", keywords: ["return", "refund", "exchange", "wrong size", "damaged"] },
  { intent: "shipping", keywords: ["shipping", "delivery", "arrive", "late", "dispatch"] },
  { intent: "payment_issue", keywords: ["payment", "card", "charged", "failed", "transaction"] },
  { intent: "account_issue", keywords: ["login", "account", "password", "sign in", "otp"] },
  { intent: "complaint", keywords: ["complaint", "angry", "terrible", "bad service", "frustrated"] },
  { intent: "speak_to_agent", keywords: ["human", "agent", "real person", "support person", "escalate"] },
  { intent: "goodbye", keywords: ["bye", "goodbye", "thanks", "thank you"] },
];

function detectIntent(message) {
  const text = normalizeText(message);
  const matched = intentRules.find((rule) => containsAny(text, rule.keywords));
  return matched ? matched.intent : "general";
}

module.exports = {
  detectIntent,
};
