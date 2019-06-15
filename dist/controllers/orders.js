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

var orders = {
  createNewOrder: function createNewOrder(req, res) {
    var Res = {
      status: 201,
      data: Object.assign({
        created_on: new Date()
      }, req.body)
    };

    _storage["default"].orders.push(Res.data);

    res.status(Res.status).json(Res.data);
  },
  updateOrderPrice: function updateOrderPrice(req, res) {
    var Res = {
      status: 202,
      data: {
        last_modified: new Date()
      }
    };

    var order = _storage["default"].orders.find(function (Order) {
      return Order.id === parseInt(req.params.orderId, 10);
    });

    if (order) {
      if (order.status === 'pending') {
        order.old_price_offer = order.price_offer;
        order.new_price_offer = req.body.price_offer;
        delete order.price_offer;
        Object.assign(Res.data, order);
      } else {
        Res.status = 405;
        Res.data = new Error(405, 'This order cannot be changed');
      }
    } else {
      Res.status = 404;
      Res.data = new Error(404, 'not found');
    }

    res.status(Res.status).json(Res.data);
  }
};
var _default = orders;
exports["default"] = _default;