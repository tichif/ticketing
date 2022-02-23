import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res, next) => {
  req.session = null;

  return res.send({});
});

export { router as signOutRouter };
