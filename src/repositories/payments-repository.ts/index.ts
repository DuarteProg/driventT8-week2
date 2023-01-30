import { prisma } from "@/config";
import { Enrollment, Payment, Ticket, TicketStatus } from "@prisma/client";
import { type } from "os";

async function getPaymentsWithId(ticketId: number) {
  return prisma.payment.findFirst({
    where:{
      ticketId
    }
  });
};

type Body = {
  ticketId: number,
  cardData: {
    issuer: string,
    number: number,
    name: string,
    expirationDate: Date,
    cvv: number
  }
}

async function getPriceByTicketId(ticketId: number) {
return prisma.ticket.findFirst({
  where:{
    id: ticketId,

  },
  include: {
    TicketType: true,
    Enrollment: true
}
})
}
export type paramentsData = Omit<Payment, "id" | "createdAt" | "updatedAt">

async function postPayments(rightData:paramentsData) {
  return prisma.payment.create({
    data:{
      ...rightData
    }
  });
};

async function findTickeyById(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    }
  })
}

async function findTicket(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Payment: true,
      Enrollment: true
    }
  })
}

async function CreatePayment(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID
    }
  })
}


const paymentsRepository = {
  getPaymentsWithId,
  postPayments,
  getPriceByTicketId,
  findTickeyById,
  CreatePayment,
  findTicket
};

export default paymentsRepository;