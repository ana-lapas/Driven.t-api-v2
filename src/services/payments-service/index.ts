import { TicketStatus } from '@prisma/client';
import { notFoundError, unauthorizedError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';
import paymentsRepositories, { PaymentType } from '@/repositories/payments-repository';

async function makePayment(ticketId: number, userId: number, cardData: PaymentType) {
  const tType = await ticketsRepository.getUsersTicketWithType(ticketId);

  const paymentInfo = {
    ticketId,
    value: tType.TicketType.price,
    cardIssuer: cardData.cardIssuer,
    cardLastDigits: cardData.cardLastDigits.slice(-4),
  };

  const payment = await paymentsRepositories.postPayment(ticketId, paymentInfo);

  await ticketsRepository.makeTicketsPayment(ticketId);

  return payment;
}

async function getPaymentFromTicketId(ticketId: number) {
  const payments = await paymentsRepositories.getPaymentByTicketId(ticketId);

  if (!payments) throw notFoundError();

  return payments;
}

const paymentsService = {
  makePayment,
  getPaymentFromTicketId,
};

export default paymentsService;
