const { processMessage } = require("../services/chatService");

function postMessage(req, res) {
  const { sessionId = "guest-session", message } = req.body || {};

  if (!message || !String(message).trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  const response = processMessage({
    sessionId: String(sessionId),
    message: String(message),
  });

  return res.json(response);
}

module.exports = {
  postMessage,
};
