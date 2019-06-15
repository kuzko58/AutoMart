"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _adverts = _interopRequireDefault(require("../controllers/adverts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();
router.get('/advert/', _adverts["default"].getAllAdverts);
router["delete"]('/advert/:advertId/', _adverts["default"].deleteAdvert);
var _default = router;
exports["default"] = _default;