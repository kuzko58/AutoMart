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

var Success = function Success(status, message) {
  _classCallCheck(this, Success);

  this.status = status;
  this.message = message;
};

var adverts = {
  createNewAdvert: function createNewAdvert(req, res) {
    var Res = {
      status: 201,
      data: Object.assign({
        created_on: new Date()
      }, req.body)
    };

    _storage["default"].adverts.push(Res.data);

    res.status(Res.status).json(Res.data);
  },
  updateAdvert: function updateAdvert(req, res) {
    var Res = {
      status: 202,
      data: {}
    };

    var advert = _storage["default"].adverts.find(function (Advert) {
      return Advert.id === parseInt(req.params.advertId, 10);
    });

    if (advert) {
      Object.assign(advert, req.body);
      Object.assign(Res.data, advert);
    } else {
      Res.status = 404;
      Res.data = new Error(404, 'not  found');
    }

    res.status(Res.status).json(Res.data);
  },
  getSpecificAdvert: function getSpecificAdvert(req, res) {
    var Res = {
      status: 200,
      data: {}
    };

    var advert = _storage["default"].adverts.find(function (Advert) {
      return Advert.id === parseInt(req.params.advertId, 10);
    });

    if (advert) Object.assign(Res.data, advert);else {
      Res.status = 404;
      Res.data = new Error(404, 'not found');
    }
    res.status(Res.status).json(Res.data);
  },
  getAllAdverts: function getAllAdverts(req, res) {
    var allAdverts = _storage["default"].adverts;
    if (allAdverts.length) res.status(200).json(allAdverts);else res.status(404).jason(new Error(404, 'no adverts found'));
  },
  getFilteredAdverts: function getFilteredAdverts(req, res) {
    var filteredAdverts = _storage["default"].adverts.slice();

    if (req.query.status) {
      filteredAdverts = filteredAdverts.filter(function (ad) {
        return ad.status === req.query.status;
      });
    }

    if (req.query.body_type) {
      filteredAdverts = filteredAdverts.filter(function (ad) {
        return ad.bodyType === req.query.body_type;
      });
    }

    if (req.query.brand) {
      filteredAdverts = filteredAdverts.filter(function (ad) {
        return ad.brand === req.query.brand;
      });
    }

    if (req.query.condition) {
      filteredAdverts = filteredAdverts.filter(function (ad) {
        return ad.condition === req.query.condition;
      });
    }

    if (req.query.min_price) {
      var reqToInt = parseInt(req.query.min_price, 10);
      filteredAdverts = filteredAdverts.filter(function (ad) {
        return ad.price >= reqToInt;
      });
    }

    if (req.query.max_price) {
      var _reqToInt = parseInt(req.query.max_price, 10);

      filteredAdverts = filteredAdverts.filter(function (ad) {
        return ad.price <= _reqToInt;
      });
    }

    res.status(200).json(filteredAdverts);
  },
  getAllUserAdverts: function getAllUserAdverts(req, res) {
    var userAdverts = _storage["default"].adverts.filter(function (ad) {
      return ad.owner === parseInt(req.params.userId, 10);
    });

    if (userAdverts.length > 0) res.status(200).json(userAdverts);else res.status(404).json(new Error(404, "No adverts found for this user: ".concat(req.params.userId)));
  },
  deleteAdvert: function deleteAdvert(req, res) {
    var advert = _storage["default"].adverts.find(function (Advert) {
      return Advert.id === parseInt(req.params.advertId, 10);
    });

    if (advert) {
      _storage["default"].adverts.splice(_storage["default"].adverts.indexOf(advert), 1);

      res.status(200).json(new Success(200, 'Advert successfully deleted'));
    } else {
      res.status(404).json(new Error(404, 'Advert not found'));
    }
  }
};
var _default = adverts;
exports["default"] = _default;