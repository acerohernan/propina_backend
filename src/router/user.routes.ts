import express from 'express';
import {
  addBcpPaymentHandler,
  addYapePaymentHandler,
} from '../controllers/payment.controller';
import {
  getUserInformationHandler,
  updateUserInformationHandler,
} from '../controllers/user.controller';
import { requireAuth } from '../middlewares/requireAuth';
import { validateSchema } from '../middlewares/validateSchema';
import { addBcpSchema, addYapeSchema } from '../schema/payment.schemas';
import {
  getUserInformationSchema,
  updateUserSchema,
} from '../schema/user.schema';

const userRouter = express.Router();

userRouter.get(
  '/:username',
  validateSchema(getUserInformationSchema),
  getUserInformationHandler
);

userRouter.put(
  '',
  requireAuth,
  validateSchema(updateUserSchema),
  updateUserInformationHandler
);

userRouter.post(
  '/payment/add-yape',
  requireAuth,
  validateSchema(addYapeSchema),
  addYapePaymentHandler
);

userRouter.post(
  '/payment/add-bcp',
  requireAuth,
  validateSchema(addBcpSchema),
  addBcpPaymentHandler
);

export default userRouter;
