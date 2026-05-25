# E-Commerce Chatbot (Hybrid: Rule-Based + AI Fallback)

A complete full-stack e-commerce chatbot demo with:
- **Frontend:** Next.js chat interface
- **Backend:** Node.js + Express API
- **Hybrid bot logic:** rule-based intent routing plus AI-style fallback responses
- **End-to-end mock data:** products, orders, FAQ, and support tickets
- **Human handoff flow:** automatic escalation for complaints/unresolved cases

## Features

- Product search and recommendations
- FAQ support
- Order tracking by order number
- Returns/refunds, shipping, payment, and account issue handling
- Complaint flow + escalation to human support
- Reusable modular backend services/routes/controllers
- Shared chatbot prompts (system, sales, support)

## Project Structure

```text
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── prompts/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   └── tests/
├── frontend/
│   ├── src/app/
│   ├── src/components/
│   ├── src/services/
│   └── src/types/
├── shared/prompts/
└── docs/
```

## Quick Start

### 1) Backend

```bash
cd /home/runner/work/Chat-bot/Chat-bot/backend
cp .env.example .env
npm install
npm run dev
```

Backend runs at `http://localhost:4000`.

### 2) Frontend

```bash
cd /home/runner/work/Chat-bot/Chat-bot/frontend
cp .env.example .env.local
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

## Test

```bash
cd /home/runner/work/Chat-bot/Chat-bot/backend
npm test
```

## Build / Lint

```bash
cd /home/runner/work/Chat-bot/Chat-bot/frontend
npm run lint
npm run build
```

## API Overview

- `POST /api/chat/message`
- `GET /api/products`
- `GET /api/products/search?q=...`
- `GET /api/products/:id`
- `GET /api/orders/:orderNumber`
- `GET /api/tickets`
- `POST /api/tickets`

Detailed examples: [`docs/api-spec.md`](./docs/api-spec.md)

## Prompt Files

- [`shared/prompts/systemPrompt.txt`](./shared/prompts/systemPrompt.txt)
- [`shared/prompts/salesPrompt.txt`](./shared/prompts/salesPrompt.txt)
- [`shared/prompts/supportPrompt.txt`](./shared/prompts/supportPrompt.txt)

## Notes

- This implementation is demo-ready and production-oriented in structure.
- Data is mocked intentionally so the app runs end-to-end without external services.
- You can replace mock services with real DB/API integrations incrementally.
