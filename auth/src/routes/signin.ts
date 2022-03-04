import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../utils/password';
import {
  RequestValidationError,
  BadRequestError,
} from '@tichif-ticketing/common';
import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password is required.'),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const matchedPasswords = await Password.compare(
      existingUser.password,
      password
    );

    if (!matchedPasswords) {
      throw new BadRequestError('Invalid credentials');
    }

    // generate JWT token
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // store it on the session object
    // req.session.jwt = jwt (JS mode)
    req.session = {
      jwt: userJwt,
    }; // (typescript mode)

    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
