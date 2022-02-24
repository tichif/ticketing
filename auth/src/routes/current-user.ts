import express from 'express';
import jwt from 'jsonwebtoken';

import { currentUser } from '../middleware/current-user';

const router = express.Router();

router.get('/api/users/current-user', currentUser, (req, res, next) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
