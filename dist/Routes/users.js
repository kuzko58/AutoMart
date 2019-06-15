"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _adverts = _interopRequireDefault(require("../controllers/adverts"));

var _members = _interopRequireDefault(require("../controllers/members"));

var _orders = _interopRequireDefault(require("../controllers/orders"));

var _flags = _interopRequireDefault(require("../controllers/flags"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express["default"])();
router.post('/auth/signup', _members["default"].createUserAccount);
router.post('/auth/signin', _members["default"].logInUser);
router.post('/advert/', _adverts["default"].createNewAdvert);
router.post('/order/', _orders["default"].createNewOrder);
router.post('/flag/', _flags["default"].createNewFlag);
router.patch('/order/:orderId/price', _orders["default"].updateOrderPrice);
router.patch('/advert/:advertId/status', _adverts["default"].updateAdvert);
router.patch('/advert/:advertId/price', _adverts["default"].updateAdvert);
router.get('/advert/:advertId', _adverts["default"].getSpecificAdvert);
router.get('/advert', _adverts["default"].getFilteredAdverts);
/* query string
[ ?status=available ?status=available&min_price=XXXValue&max_price=XXXValue
  ?status=available&condition=new ?status=available&condition=used
?status=available&brand=XXXValue ?body_type=bodyType]
*/

router.get('/user/:userId/advert/', _adverts["default"].getAllUserAdverts);
var _default = router;
exports["default"] = _default;