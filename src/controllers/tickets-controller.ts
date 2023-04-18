import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function postTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body;

  try {
    if (!ticketTypeId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const ticket = await ticketsService.createUserTicket(userId, ticketTypeId);
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const ticket = await ticketsService.getUserTicket(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTicketsType(req: Request, res: Response) {
  try {
    const ticketType = await ticketsService.getTicketType();
    return res.status(httpStatus.OK).send(ticketType);
  } catch (err) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
