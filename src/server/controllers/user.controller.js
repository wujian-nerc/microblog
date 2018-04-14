import User from '../models/user';

export function addUser (req, res) {
  console.log(req.form);
  if (!req.body.name || !req.body.email) {
    return res.status(403).end();
  }

  const newUser = new User({
    name: req.body.name,
    email: req.body.email
  });
  newUser.save((err, saved) => {
    if (err) {
      res.status(500).send(err).end();
    }
    res.json({ user: saved });
  })
}

export function getUser (req, res) {
  User.find().exec((err, users) => {
    if (err) {
      res.status(500).send(er).end();
    }
    res.json({ users });
  });
}

