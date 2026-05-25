const { getOrderByNumber } = require("../services/orderService");

function getByOrderNumber(req, res) {
  const order = getOrderByNumber(req.params.orderNumber);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  return res.json({ order });
}

module.exports = {
  getByOrderNumber,
};
