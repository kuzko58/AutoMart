"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _debug = _interopRequireDefault(require("debug"));

var _users = _interopRequireDefault(require("../Routes/users"));

var _admin = _interopRequireDefault(require("../Routes/admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var debug = (0, _debug["default"])('AutoMart');
var app = (0, _express["default"])();
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.get('/', function (req, res) {
  res.send('Hello world!');
});
app.use('/api/v1', function (req, res) {
  var sender = req.get('sender');

  if (sender === 'user') {
    (0, _users["default"])(req, res);
  } else if (sender === 'admin') {
    (0, _admin["default"])(req, res);
  } else {
    res.send('something went wrong');
  }
});
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  return debug("Listening on ".concat(port, "..."));
});
var _default = server;
exports["default"] = _default;