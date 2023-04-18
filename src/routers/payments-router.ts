import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getPaymentId, postPayment } from '@/controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/', getPaymentId).post('/process', postPayment);

export { paymentsRouter };
