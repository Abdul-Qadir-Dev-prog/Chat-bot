import type { Ticket } from "@/types/chat";

type TicketCardProps = {
  ticket: Ticket;
};

export function TicketCard({ ticket }: TicketCardProps) {
  return (
    <article className="action-card escalated">
      <h4>Support ticket created</h4>
      <p>Ticket ID: {ticket.id}</p>
      <p>Priority: {ticket.priority}</p>
      <p>Status: {ticket.status}</p>
    </article>
  );
}
