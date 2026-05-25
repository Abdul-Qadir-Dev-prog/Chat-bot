# Chatbot Intents

- `greet`
- `product_search`
- `product_recommendation`
- `faq`
- `order_tracking`
- `returns_refunds`
- `shipping`
- `payment_issue`
- `account_issue`
- `complaint`
- `speak_to_agent`
- `goodbye`
- `general` (AI-style fallback)

The bot uses rule-based routing first. For unmatched/general conversations, it uses a fallback AI-style response and escalates after repeated unresolved turns.
