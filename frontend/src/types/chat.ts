export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  rating: number;
};

export type Order = {
  orderNumber: string;
  status: string;
  shippingStatus: string;
  estimatedDelivery: string;
  trackingNumber: string | null;
  total: number;
};

export type Ticket = {
  id: string;
  intent: string;
  priority: string;
  status: string;
};

export type BotAction =
  | { type: "products"; data: Product[] }
  | { type: "order"; data: Order }
  | { type: "ticket"; data: Ticket }
  | { type: "handoff"; data: { queue: string; reason: string } }
  | { type: "fallback"; data: { unresolvedCount: number } };

export type ChatResponse = {
  reply: string;
  intent: string;
  actions: BotAction[];
};

export type ChatMessage = {
  id: string;
  role: "user" | "bot";
  content: string;
  intent?: string;
  actions?: BotAction[];
};
