import express from 'express';

const router = express.Router();

router.post('/api/users/signin', (req, res, next) => {
  res.send('hi there');
});

export { router as signInRouter };
