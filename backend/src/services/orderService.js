const { orders } = require("../data/mockData");

function getOrderByNumber(orderNumber) {
  if (!orderNumber) return null;
  return orders.find((order) => order.orderNumber.toLowerCase() === String(orderNumber).toLowerCase());
}

module.exports = {
  getOrderByNumber,
};
