import { Router, Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  RequestValidationError,
  NotAuthorizeError,
} from '@tichif-ticketing/common';
import { body, validationResult } from 'express-validator';

import { Ticket } from '../models/ticket';

const router = Router();

router.put(
  '/api/tickets/:id',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price is incorrect'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }

    // const { title, price, userId } = req.body;
    const { title, price } = req.body;

    // if (ticket.userId !== userId) {
    //   throw new NotAuthorizeError();
    // }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizeError();
    }

    ticket.set({
      title,
      price,
    });

    await ticket.save();

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
