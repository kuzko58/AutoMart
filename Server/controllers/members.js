import bcrypt from 'bcrypt';
import storage from '../storage';
import auth from '../middlewares/authentication';

const saltRounds = 10;
const genToken = auth.generateToken;

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
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        req.body.password = hash;
        storage.users.push(req.body);
        genToken(req.body)
          .then(resolved => res.status(201).json(resolved));
      });
    }
  },
  logInUser: (req, res) => {
    const user = storage.users.find(User => User.email === req.body.email);
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          genToken(user)
            .then(resolved => res.status(202).json(resolved));
        } else res.status(401).json(new Error(401, 'email and password do not match'));
      });
    } else res.status(404).json(new Error(404, 'User does not exist'));
  },
};

export default members;
