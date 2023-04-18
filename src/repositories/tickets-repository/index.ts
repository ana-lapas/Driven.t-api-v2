import { Ticket, TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

async function createTicket(ticket: CreateTicketType) {
  return prisma.ticket.create({
    data: {
      ...ticket,
    },
  });
}

export type CreateTicketType = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

async function getTicketsByEnrollementID(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId: enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function getTicketsType() {
  return prisma.ticketType.findMany();
}

async function getUsersTicketWithType(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function makeTicketsPayment(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

const ticketsRepositories = {
  createTicket,
  getTicketsByEnrollementID,
  getTicketsType,
  getUsersTicketWithType,
  makeTicketsPayment,
};

export default ticketsRepositories;
