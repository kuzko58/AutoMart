import storage from '../storage';

class Error {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

const members = {
  createUserAccount: (req, res) => {
    const Res = {
      status: 201,
      data: {
        token: '45erkjherht45495783',
      },
    };
    const user = storage.users.find(User => User.email === req.body.email);
    if (user) {
      Res.status = 409;
      Res.data = new Error(409, 'User already exists');
    } else {
      storage.users.push(req.body);
      Res.data = Object.assign(Res.data, req.body);
    }
    res.status(Res.status).json(Res.data);
  },
  logInUser: (req, res) => {
    const Res = {
      status: 202,
      data: {
        token: '45erkjherht45495783',
      },
    };
    const user = storage.users.find(User => User.email === req.body.email);
    if (user) {
      if (user.password === req.body.password) Res.data = Object.assign(Res.data, user);
      else {
        Res.status = 401;
        Res.data = new Error(401, 'email and password do not match');
      }
    } else {
      Res.status = 401;
      Res.data = new Error(401, 'User does not exist');
    }
    res.status(Res.status).json(Res.data);
  },
};

export default members;
