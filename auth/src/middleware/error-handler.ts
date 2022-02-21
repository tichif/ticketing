import { Request, Response, NextFunction } from 'express';

import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    console.log('Handling request validation error');
  }

  if (err instanceof DatabaseConnectionError) {
    console.log('Database connection error');
  }

  res.status(400).json({
    message: err.message,
  });
};
