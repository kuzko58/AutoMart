import storage from '../storage';

class Error {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

const members = {
  createUserAccount: (req, res) => {
    const user = storage.users.find(User => User.email === req.body.email);
    if (user) res.status(409).json(new Error(409, 'User already exists'));
    else {
      storage.users.push(req.body);
      res.status(201).json(req.body);
    }
  },
  logInUser: (req, res) => {
    const user = storage.users.find(User => User.email === req.body.email);
    if (user) {
      if (user.password === req.body.password) res.status(202).json(user);
      else res.status(401).json(new Error(401, 'email and password do not match'));
    } else res.status(404).json(new Error(404, 'User does not exist'));
  },
};

export default members;
