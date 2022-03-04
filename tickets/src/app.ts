import express from 'express';
import 'express-async-errors';
import { json } from 'express';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError } from '@tichif-ticketing/common';

const app = express();
app.set('trust proxy', true);

// middleware
app.use(json());
app.use(
  cookieSession({
    signed: false, // disable encryption
    secure: process.env.NODE_ENV !== 'test',
  })
);

// Routes

app.all('*', () => {
  throw new NotFoundError();
});

// Handle error
app.use(errorHandler);

export { app };
