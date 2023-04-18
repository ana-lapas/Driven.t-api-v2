import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';

async function postPayment(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId, cardData } = req.body;

  try {
    if (!ticketId || !cardData) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    };

    const newPayment = await paymentsService.makePayment(ticketId, userId, cardData);
    if (!newPayment) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    };
    return res.status(httpStatus.OK).send(newPayment);
  } catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

async function getPaymentId(req: AuthenticatedRequest, res: Response) {
  const ticketId = Number(req.query.ticketId);
  const { userId } = req;

  try {
    if (!ticketId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    };
    const newPayment = await paymentsService.getPaymentFromTicketId(ticketId);
    if (!newPayment) {
      return res.sendStatus(httpStatus.NOT_FOUND);
    };
    return res.status(httpStatus.OK).send(newPayment);
  } catch (err) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export default {
  getPaymentId,
  postPayment,
};