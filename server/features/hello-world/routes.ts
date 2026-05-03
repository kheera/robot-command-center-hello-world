import { Router, Request, Response } from 'express';

export const prefix = '/api';

const router = Router();

router.get('/hello', (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello, World' });
});

export { router };
