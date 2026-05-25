const { products } = require("../data/mockData");
const { normalizeText } = require("../utils/messageUtils");

function listProducts() {
  return products;
}

function getProductById(productId) {
  return products.find((product) => product.id === productId);
}

function searchProducts(query = "") {
  const q = normalizeText(query);
  if (!q) {
    return products.slice(0, 5);
  }

  const exactMatches = products.filter((product) => {
    const haystack = [
      product.name,
      product.description,
      product.brand,
      product.category,
      ...(product.tags || []),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });

  if (exactMatches.length > 0) {
    return exactMatches;
  }

  const tokens = q.split(/\s+/).filter((token) => token.length > 2);
  if (tokens.length === 0) {
    return [];
  }

  return products.filter((product) => {
    const haystack = [
      product.name,
      product.description,
      product.brand,
      product.category,
      ...(product.tags || []),
    ]
      .join(" ")
      .toLowerCase();

    return tokens.some((token) => haystack.includes(token));
  });
}

function recommendProducts({ category, maxPrice } = {}) {
  return products
    .filter((product) => {
      const categoryOk = category ? product.category === category : true;
      const priceOk = Number.isFinite(maxPrice) ? product.price <= maxPrice : true;
      return categoryOk && priceOk;
    })
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
}

module.exports = {
  listProducts,
  getProductById,
  searchProducts,
  recommendProducts,
};
