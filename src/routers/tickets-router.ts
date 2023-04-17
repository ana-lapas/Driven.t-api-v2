import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import ticketsController from '@/controllers/tickets-controller';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken);
ticketsRouter
  .get('/tickets/types', ticketsController.getTicketsType)
  .post('/tickets', ticketsController.postTickets)
  .get('/tickets', ticketsController.getTickets);

export { ticketsRouter };
