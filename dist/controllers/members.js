"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _storage = _interopRequireDefault(require("../storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Error = function Error(status, message) {
  _classCallCheck(this, Error);

  this.status = status;
  this.message = message;
};

var members = {
  createUserAccount: function createUserAccount(req, res) {
    var Res = {
      status: 201,
      data: {
        token: '45erkjherht45495783'
      }
    };

    var user = _storage["default"].users.find(function (User) {
      return User.email === req.body.email;
    });

    if (user) {
      Res.status = 409;
      Res.data = new Error(409, 'User already exists');
    } else {
      _storage["default"].users.push(req.body);

      Res.data = Object.assign(Res.data, req.body);
    }

    res.status(Res.status).json(Res.data);
  },
  logInUser: function logInUser(req, res) {
    var Res = {
      status: 202,
      data: {
        token: '45erkjherht45495783'
      }
    };

    var user = _storage["default"].users.find(function (User) {
      return User.email === req.body.email;
    });

    if (user) {
      if (user.password === req.body.password) Res.data = Object.assign(Res.data, user);else {
        Res.status = 401;
        Res.data = new Error(401, 'email and password do not match');
      }
    } else {
      Res.status = 401;
      Res.data = new Error(401, 'User does not exist');
    }

    res.status(Res.status).json(Res.data);
  }
};
var _default = members;
exports["default"] = _default;