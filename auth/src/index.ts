import express from 'express';
import { json } from 'express';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';

const app = express();

app.use(json());

// Routes
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

// Handle error
app.use(errorHandler);

app.listen(3000, () => console.log('Listening on port 3000'));
