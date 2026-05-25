const { randomUUID } = require("node:crypto");

const tickets = [];

function createTicket({ sessionId, intent, summary, priority = "medium" }) {
  const ticket = {
    id: `TKT-${randomUUID().slice(0, 8).toUpperCase()}`,
    sessionId,
    intent,
    summary,
    priority,
    status: "open",
    createdAt: new Date().toISOString(),
  };

  tickets.push(ticket);
  return ticket;
}

function listTickets() {
  return tickets;
}

module.exports = {
  createTicket,
  listTickets,
};
