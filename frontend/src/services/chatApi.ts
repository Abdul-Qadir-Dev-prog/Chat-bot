import type { ChatResponse } from "@/types/chat";

const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function sendChatMessage(sessionId: string, message: string): Promise<ChatResponse> {
  const response = await fetch(`${apiBase}/api/chat/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId, message }),
  });

  if (!response.ok) {
    throw new Error("Unable to process message");
  }

  return response.json();
}
