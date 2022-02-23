import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.get('/api/users/current-user', (req, res, next) => {
  // !req.session || !req.session.jwt
  if (!req.session?.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
    res.send({ currentUser: payload });
  } catch (error) {
    return res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };
