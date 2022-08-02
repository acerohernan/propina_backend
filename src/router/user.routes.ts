import express from 'express';
import {
  addBcpPaymentHandler,
  addYapePaymentHandler,
} from '../controllers/payment.controller';
import {
  acceptTipRequestHandler,
  createTipRequestHandler,
  deleteTipRequestHandler,
  getAllTipRequestsHandler,
} from '../controllers/tip.controller';
import getAllUserCategoriesHandler, {
  getUserInformationHandler,
  updateUserInformationHandler,
} from '../controllers/user.controller';
import { requireAuth } from '../middlewares/requireAuth';
import { validateSchema } from '../middlewares/validateSchema';
import { addBcpSchema, addYapeSchema } from '../schema/payment.schemas';
import {
  acceptTipRequestSchema,
  createTipRequestSchema,
} from '../schema/tip.schema';
import {
  getUserInformationSchema,
  updateUserSchema,
} from '../schema/user.schema';

const userRouter = express.Router();

userRouter.get('/category', getAllUserCategoriesHandler);
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

userRouter.post(
  '/tip',
  validateSchema(createTipRequestSchema),
  createTipRequestHandler
);

userRouter.get('/tip/request', requireAuth, getAllTipRequestsHandler);

userRouter.post(
  '/tip/:requestId/accept',
  validateSchema(acceptTipRequestSchema),
  requireAuth,
  acceptTipRequestHandler
);

userRouter.get('/tip/:requestId/decline', requireAuth, deleteTipRequestHandler);

export default userRouter;
