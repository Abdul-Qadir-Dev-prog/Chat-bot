const { createTicket, listTickets } = require("../services/supportService");

function create(req, res) {
  const { sessionId = "guest-session", intent = "manual", summary = "Manual support request", priority = "medium" } = req.body || {};
  const ticket = createTicket({ sessionId, intent, summary, priority });
  return res.status(201).json({ ticket });
}

function list(req, res) {
  return res.json({ tickets: listTickets() });
}

module.exports = {
  create,
  list,
};
