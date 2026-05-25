const test = require("node:test");
const assert = require("node:assert/strict");
const { processMessage } = require("../src/services/chatService");

test("routes product search to catalog action", () => {
  const result = processMessage({ sessionId: "s1", message: "show me running shoes" });
  assert.equal(result.intent, "product_search");
  assert.equal(result.actions[0].type, "products");
  assert.ok(result.actions[0].data.length > 0);
});

test("asks for order number when tracking message has none", () => {
  const result = processMessage({ sessionId: "s2", message: "where is my order" });
  assert.equal(result.intent, "order_tracking");
  assert.match(result.reply, /order number/i);
});

test("returns order details when valid order number is provided", () => {
  const result = processMessage({ sessionId: "s3", message: "track ORD-1001" });
  assert.equal(result.intent, "order_tracking");
  assert.equal(result.actions[0].type, "order");
  assert.equal(result.actions[0].data.orderNumber, "ORD-1001");
});

test("escalates complaint to support with ticket and handoff", () => {
  const result = processMessage({ sessionId: "s4", message: "I have a complaint and need a human" });
  assert.equal(result.intent, "complaint");
  assert.equal(result.actions[0].type, "ticket");
  assert.equal(result.actions[1].type, "handoff");
});
