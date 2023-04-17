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

const ticketsRepositories = {
  createTicket,
  getTicketsByEnrollementID,
  getTicketsType,
};

export default ticketsRepositories;
