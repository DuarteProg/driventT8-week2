import { TicketStatus } from "@prisma/client";
export type Ticket = {
    ticketTypeId: number;
    enrollmentId: number;
    status: TicketStatus;

}