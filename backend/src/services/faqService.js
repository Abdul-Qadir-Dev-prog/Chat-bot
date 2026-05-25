const { faqs } = require("../data/mockData");
const { normalizeText } = require("../utils/messageUtils");

function findFaqMatch(message) {
  const text = normalizeText(message);
  return faqs.find((faq) => text.includes(normalizeText(faq.question).replace("?", "")) || normalizeText(faq.question).split(" ").some((word) => word.length > 4 && text.includes(word)));
}

function listFaqs() {
  return faqs;
}

module.exports = {
  findFaqMatch,
  listFaqs,
};
