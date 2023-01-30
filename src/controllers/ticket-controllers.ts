import { AuthenticatedRequest } from '@/middlewares';
import ticketService from '@/services/tickets-service.ts';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const tickets = await ticketService.getTicketTypes();

    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function userTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const tickets = await ticketService.getTicketTypesById(+userId);

    return res.status(httpStatus.OK).send(tickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postTicketTypes(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;
  if (!ticketTypeId) res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const postTickets = await ticketService.postTicketTypes(+userId, ticketTypeId);

    return res.status(httpStatus.CREATED).send(postTickets);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
