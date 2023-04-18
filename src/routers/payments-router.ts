import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getPaymentId, postPayment } from '@/controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('/payments', getPaymentId).post('/payments/process', postPayment);

export { paymentsRouter };
