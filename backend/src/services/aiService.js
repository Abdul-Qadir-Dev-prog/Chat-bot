const systemPrompt = require("../prompts/systemPrompt");
const salesPrompt = require("../prompts/salesPrompt");
const supportPrompt = require("../prompts/supportPrompt");

function generateGeneralResponse({ message, intent }) {
  const intentContext = {
    product_search: salesPrompt,
    product_recommendation: salesPrompt,
    order_tracking: supportPrompt,
    returns_refunds: supportPrompt,
    payment_issue: supportPrompt,
    account_issue: supportPrompt,
    shipping: supportPrompt,
  };

  const promptFlavor = intentContext[intent] || systemPrompt;

  return {
    text: `I understand. ${message.trim()} — I can help with that. ${
      intent === "general"
        ? "Could you share a little more detail so I can guide you accurately?"
        : "I will guide you step by step."
    }`,
    promptUsed: promptFlavor,
  };
}

module.exports = {
  generateGeneralResponse,
};
