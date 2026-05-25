const { searchProducts, getProductById, listProducts } = require("../services/productService");

function search(req, res) {
  const { q = "" } = req.query;
  const products = searchProducts(String(q));
  return res.json({ products });
}

function getById(req, res) {
  const product = getProductById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  return res.json({ product });
}

function getAll(req, res) {
  return res.json({ products: listProducts() });
}

module.exports = {
  search,
  getById,
  getAll,
};
