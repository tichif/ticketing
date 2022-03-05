import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

import { requireAuth, RequestValidationError } from '@tichif-ticketing/common';

const router = Router();

router.post(
  '/api/tickets',
  // requireAuth,
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

    return res.send({});
  }
);

export { router as createTicketRouter };
