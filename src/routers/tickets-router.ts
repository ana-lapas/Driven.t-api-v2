import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTickets, postTickets, getTicketsType } from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/tickets/types', getTicketsType)
  .post('/tickets', postTickets)
  .get('/tickets', getTickets);

export { ticketsRouter };
