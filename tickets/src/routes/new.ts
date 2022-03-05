import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

import { requireAuth, RequestValidationError } from '@tichif-ticketing/common';
import { Ticket } from '../models/ticket';

const router = Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than zero'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { title, price } = req.body;
    // const { title, price, userId } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    // const ticket = Ticket.build({
    //   title,
    //   price,
    //   userId,
    // });

    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
