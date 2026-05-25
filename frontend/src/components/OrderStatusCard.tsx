import type { Order } from "@/types/chat";

type OrderStatusCardProps = {
  order: Order;
};

export function OrderStatusCard({ order }: OrderStatusCardProps) {
  return (
    <article className="action-card">
      <h4>{order.orderNumber}</h4>
      <p>Status: {order.status}</p>
      <p>Shipping: {order.shippingStatus}</p>
      <p>Estimated delivery: {order.estimatedDelivery}</p>
      <p>Tracking: {order.trackingNumber || "Pending"}</p>
    </article>
  );
}
