import { Router, Request, Response, NextFunction } from 'express';
import { app } from '../app';

const router = Router();

router.post(
  '/api/tickets',
  async (req: Request, res: Response, next: NextFunction) => {
    return res.send({});
  }
);

export { router as createTicketRouter };
