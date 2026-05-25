/**
 * @typedef {Object} ChatMessage
 * @property {"user"|"bot"|"agent"} role
 * @property {string} content
 * @property {string} [intent]
 * @property {string} [timestamp]
 */

/**
 * @typedef {Object} SupportTicket
 * @property {string} id
 * @property {string} sessionId
 * @property {string} intent
 * @property {string} summary
 * @property {"low"|"medium"|"high"} priority
 * @property {"open"|"resolved"} status
 */

module.exports = {};
