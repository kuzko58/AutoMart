"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _storage = _interopRequireDefault(require("../storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var flags = {
  createNewFlag: function createNewFlag(req, res) {
    var Res = {
      status: 201,
      data: Object.assign({
        created_on: new Date()
      }, req.body)
    };

    _storage["default"].flags.push(req.body);

    res.status(Res.status).json(Res.data);
  }
};
var _default = flags;
exports["default"] = _default;