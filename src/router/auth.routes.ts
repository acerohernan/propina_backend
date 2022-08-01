import express from 'express';
import {
  changePasswordHandler,
  loginHandler,
  requestForgotPasswordHandler,
  signUpHandler,
  verifyCodeHandler,
} from '../controllers/auth.controller';
import { validateSchema } from '../middlewares/validateSchema';
import {
  changePasswordSchema,
  loginSchema,
  requestForgotPasswordSchema,
  singUpSchema,
  verifyCodeSchema,
} from '../schema/auth.schemas';

const authRouter = express.Router();

authRouter.post('/signup', validateSchema(singUpSchema), signUpHandler);
authRouter.post('/login', validateSchema(loginSchema), loginHandler);
authRouter.post(
  '/forgot-password',
  validateSchema(requestForgotPasswordSchema),
  requestForgotPasswordHandler
);
authRouter.get(
  '/verify-code/:code',
  validateSchema(verifyCodeSchema),
  verifyCodeHandler
);
authRouter.post(
  '/change-password',
  validateSchema(changePasswordSchema),
  changePasswordHandler
);

export default authRouter;
