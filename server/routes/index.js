import Express from 'express';

const router = Express.Router();

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