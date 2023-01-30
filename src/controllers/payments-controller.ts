import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service.ts';
import { Response } from 'express';
import httpStatus from 'http-status';
import { number } from 'joi';

export async function getPayments(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.query;
  const { userId } = req;
  if (!ticketId) res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const payment = await paymentsService.getPayments(userId, +ticketId);
    if(!payment) res.sendStatus(httpStatus.UNAUTHORIZED);
    
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}



export async function postPayments(req: AuthenticatedRequest, res: Response) {
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

  const cardData = req.body as Body;
  const { userId } = req;
  try {

    const postTickets = await paymentsService.postPayment(userId, cardData);

    return res.status(httpStatus.OK).send(postTickets);
  } catch (error) {
    if (error.name === 'UnauthorizedError') {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}


