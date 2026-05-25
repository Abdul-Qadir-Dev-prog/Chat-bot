"use client";

import { useMemo, useState } from "react";
import { useRef } from "react";
import { sendChatMessage } from "@/services/chatApi";
import type { BotAction, ChatMessage } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { ProductCard } from "./ProductCard";
import { OrderStatusCard } from "./OrderStatusCard";
import { TicketCard } from "./TicketCard";

const quickReplies = [
  "Show me budget products",
  "Track ORD-1001",
  "What is your return policy?",
  "My payment failed",
  "I want to speak to a human agent",
];

const sessionId = "web-session";

function renderAction(action: BotAction, index: number) {
  if (action.type === "products") {
    return (
      <div className="action-group" key={`products-${index}`}>
        {action.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  if (action.type === "order") {
    return <OrderStatusCard key={`order-${index}`} order={action.data} />;
  }

  if (action.type === "ticket") {
    return <TicketCard key={`ticket-${index}`} ticket={action.data} />;
  }

  if (action.type === "handoff") {
    return (
      <div className="handoff" key={`handoff-${index}`}>
        A human support specialist can continue this in the <strong>{action.data.queue}</strong> queue.
      </div>
    );
  }

  return null;
}

export function ChatWidget() {
  const messageCounter = useRef(1);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      content:
        "Welcome to ShopAssist. I can help with products, recommendations, order tracking, returns/refunds, shipping, payments, account issues, and escalation to human support.",
      intent: "greet",
    },
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const canSend = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending]);

  function nextMessageId(prefix: "user" | "bot" | "bot-error") {
    const value = `${prefix}-${messageCounter.current}`;
    messageCounter.current += 1;
    return value;
  }

  async function submitMessage(rawMessage: string) {
    const message = rawMessage.trim();
    if (!message || isSending) return;

    const userMessage: ChatMessage = {
      id: nextMessageId("user"),
      role: "user",
      content: message,
    };
    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      const response = await sendChatMessage(sessionId, message);
      const botMessage: ChatMessage = {
        id: nextMessageId("bot"),
        role: "bot",
        content: response.reply,
        intent: response.intent,
        actions: response.actions,
      };
      setMessages((previous) => [...previous, botMessage]);
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          id: nextMessageId("bot-error"),
          role: "bot",
          content: "I could not reach support services right now. Please retry in a moment.",
          intent: "error",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="chat-shell">
      <header className="chat-header">
        <h1>E-Commerce Chatbot</h1>
        <p>Hybrid intent routing + AI fallback demo</p>
      </header>

      <section className="quick-replies">
        {quickReplies.map((quickReply) => (
          <button type="button" key={quickReply} onClick={() => void submitMessage(quickReply)} disabled={isSending}>
            {quickReply}
          </button>
        ))}
      </section>

      <main className="messages">
        {messages.map((message) => (
          <div key={message.id}>
            <MessageBubble message={message} />
            {message.actions?.map((action, index) => renderAction(action, index))}
          </div>
        ))}
        {isSending ? <div className="typing">Assistant is typing...</div> : null}
      </main>

      <form
        className="composer"
        onSubmit={(event) => {
          event.preventDefault();
          void submitMessage(input);
        }}
      >
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about products, orders, returns, payments..."
        />
        <button type="submit" disabled={!canSend}>
          Send
        </button>
      </form>
    </div>
  );
}
