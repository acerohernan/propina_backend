import express from 'express';

import authRouter from './auth.routes';
import userRouter from './user.routes';

const RootRouter = express.Router();

/* Routes */
RootRouter.use('/auth', authRouter);
RootRouter.use('/user', userRouter);

export default RootRouter;
