import { TicketStatus } from '@prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepositories from '@/repositories/tickets-repository';

async function createUserTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };
  await ticketsRepositories.createTicket(ticket);

  const NewTicket = await ticketsRepositories.getTicketsByEnrollementID(enrollment.id);

  return NewTicket;
}

async function getUserTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepositories.getTicketsByEnrollementID(enrollment.id);

  if (!ticket) throw notFoundError();

  return ticket;
}

async function getTicketType() {
  const ticketType = await ticketsRepositories.getTicketsType();
  if (!ticketType) throw notFoundError();
  return ticketType;
}

const ticketsService = {
  createUserTicket,
  getUserTicket,
  getTicketType,
};

export default ticketsService;
