import { Router } from 'express';
import userRouter from './user.router';

const router = new Router();

router.use('/user', userRouter);

router.use('/register', (req, res) => {
  res.json({
    message: 'Register success!'
  });
});


router.use('/login', (req, res) => {
  res.json({
    message: 'Login success!'
  });
});

router.use('/logout', (req, res) => {
  res.json({
    message: 'Logout success!'
  });
});

export default router;