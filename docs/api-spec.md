# API Specification

## Base URL
`http://localhost:4000`

## Endpoints

### Health
- `GET /health`

### Chat
- `POST /api/chat/message`

Request:
```json
{
  "sessionId": "web-session",
  "message": "Where is my order ORD-1001?"
}
```

Response:
```json
{
  "reply": "Order ORD-1001 is currently Shipped...",
  "intent": "order_tracking",
  "actions": [
    {
      "type": "order",
      "data": {}
    }
  ]
}
```

### Products
- `GET /api/products`
- `GET /api/products/search?q=laptop`
- `GET /api/products/:id`

### Orders
- `GET /api/orders/:orderNumber`

### Tickets
- `GET /api/tickets`
- `POST /api/tickets`
