import { prisma } from "@/config";
import { Enrollment } from "@prisma/client";
import { TicketStatus } from "@prisma/client";
export type Ticket = {
  ticketTypeId: number;
  enrollmentId: number;
  status: TicketStatus;

}


async function getAllTickets() {
  return prisma.ticketType.findMany();
};

// função que pegar o ticket pelo enrolment e faz join com o tivkettype
async function getTicketUserByEnrollment(enrollmentId: number) {
    return prisma.ticket.findFirst({
        where: {
            enrollmentId,
          },
          include: {
            TicketType: true, 
          }
    });

}

async function postTickets(ticket: Ticket ) {
    return prisma.ticket.create({
     data: {
     ...ticket
     }
    });

}


const ticketsRepository = {
    getAllTickets,
    getTicketUserByEnrollment,
    postTickets
};

export default ticketsRepository;
