import express from 'express';
import 'express-async-errors';
import { json } from 'express';
import cookieSession from 'cookie-session';

import {
  errorHandler,
  NotFoundError,
  currentUser,
} from '@tichif-ticketing/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { listTicketsRouter } from './routes';
import { updateTicketRouter } from './routes/update';

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

app.use(currentUser);

// Routes
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(listTicketsRouter);
app.use(updateTicketRouter);

app.all('*', () => {
  throw new NotFoundError();
});

// Handle error
app.use(errorHandler);

export { app };
