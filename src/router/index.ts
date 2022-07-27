import express, { Request, Response } from 'express';

const RootRouter = express.Router();

RootRouter.get('/check', (req: Request, res: Response) => {
  res.sendStatus(200);
});

export default RootRouter;
