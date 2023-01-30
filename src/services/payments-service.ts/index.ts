import { AddressEnrollment } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { TicketStatus } from "@prisma/client";
import { notFoundError, unauthorizedError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository.ts';
import paymentsRepository from '@/repositories/payments-repository.ts';
import { type } from 'os';



async function getPayments(userId: number, ticketId: number) {
  const payment = await paymentsRepository.getPaymentsWithId(ticketId);
  const userIdByEnrollment = await paymentsRepository.getPriceByTicketId(ticketId)
  if (!payment) {
    throw notFoundError();
  }
  
  if (userIdByEnrollment.Enrollment.userId !== userId) {
    throw unauthorizedError();
  };

 return payment;


}
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

type dataToInsert = {
    ticketId: number,
    value: number,
    cardIssuer: string, 
    cardLastDigits: string,
}

async function postPayment(userId: number, cardData: Body) {
  const enrollment = await paymentsRepository.findTickeyById(cardData.ticketId)
  const price = await paymentsRepository.getPriceByTicketId(cardData.ticketId)
    if (price.Enrollment.userId !== userId) {
      throw unauthorizedError();
    };
    
    
    
    const rightData : dataToInsert = {
      ticketId: cardData.ticketId,
      value: price.TicketType.price,
      cardIssuer: cardData.cardData.issuer, 
      cardLastDigits: cardData.cardData.number.toString().slice(-4),
    }    
    
    const payment = await paymentsRepository.postPayments(rightData);
    if (!payment) {
      throw notFoundError();
    }
    
    
    
    await paymentsRepository.CreatePayment(cardData.ticketId)
    
    return payment;
};


const paymentsService = {
    getPayments,
    postPayment
};

export default paymentsService;