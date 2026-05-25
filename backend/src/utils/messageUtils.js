function normalizeText(value = "") {
  return String(value).trim().toLowerCase();
}

function containsAny(text, keywords) {
  return keywords.some((keyword) => text.includes(keyword));
}

module.exports = {
  normalizeText,
  containsAny,
};
