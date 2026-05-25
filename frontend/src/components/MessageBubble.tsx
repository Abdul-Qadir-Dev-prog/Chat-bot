import type { ChatMessage } from "@/types/chat";

type MessageBubbleProps = {
  message: ChatMessage;
};

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`bubble-row ${isUser ? "user" : "bot"}`}>
      <div className={`bubble ${isUser ? "bubble-user" : "bubble-bot"}`}>
        <p>{message.content}</p>
        {message.intent && !isUser ? <span className="intent-chip">{message.intent}</span> : null}
      </div>
    </div>
  );
}
