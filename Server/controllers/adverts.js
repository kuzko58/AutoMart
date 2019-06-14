import storage from '../storage';

class Error {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

class Success {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

const adverts = {
  createNewAdvert: (req, res) => {
    const Res = {
      status: 201,
      data: Object.assign({ created_on: new Date() }, req.body),
    };
    storage.adverts.push(Res.data);
    res.status(Res.status).json(Res.data);
  },
  updateAdvert: (req, res) => {
    const Res = {
      status: 202,
      data: {},
    };
    const advert = storage.adverts.find(Advert => Advert.id === parseInt(req.params.advertId, 10));
    if (advert) {
      Object.assign(advert, req.body);
      Object.assign(Res.data, advert);
    } else {
      Res.status = 404;
      Res.data = new Error(404, 'not  found');
    }
    res.status(Res.status).json(Res.data);
  },
  getSpecificAdvert: (req, res) => {
    const Res = {
      status: 200,
      data: {},
    };
    const advert = storage.adverts.find(Advert => Advert.id === parseInt(req.params.advertId, 10));
    if (advert) Object.assign(Res.data, advert);
    else {
      Res.status = 404;
      Res.data = new Error(404, 'not found');
    }
    res.status(Res.status).json(Res.data);
  },
  getAllAdverts: (req, res) => {
    const allAdverts = storage.adverts;
    if (allAdverts.length) res.status(200).json(allAdverts);
    else res.status(404).jason(new Error(404, 'no adverts found'));
  },
  getFilteredAdverts: (req, res) => {
    let filteredAdverts = storage.adverts.slice();
    if (req.query.status) {
      filteredAdverts = filteredAdverts.filter(ad => ad.status === req.query.status);
    }
    if (req.query.body_type) {
      filteredAdverts = filteredAdverts.filter(ad => ad.bodyType === req.query.body_type);
    }
    if (req.query.brand) {
      filteredAdverts = filteredAdverts.filter(ad => ad.brand === req.query.brand);
    }
    if (req.query.condition) {
      filteredAdverts = filteredAdverts.filter(ad => ad.condition === req.query.condition);
    }
    if (req.query.min_price) {
      const reqToInt = parseInt(req.query.min_price, 10);
      filteredAdverts = filteredAdverts.filter(ad => ad.price >= reqToInt);
    }
    if (req.query.max_price) {
      const reqToInt = parseInt(req.query.max_price, 10);
      filteredAdverts = filteredAdverts.filter(ad => ad.price <= reqToInt);
    }
    res.status(200).json(filteredAdverts);
  },
  getAllUserAdverts: (req, res) => {
    const userAdverts = storage.adverts.filter(ad => ad.owner === parseInt(req.params.userId, 10));
    if (userAdverts.length > 0) res.status(200).json(userAdverts);
    else res.status(404).json(new Error(404, `No adverts found for this user: ${req.params.userId}`));
  },

  deleteAdvert: (req, res) => {
    const advert = storage.adverts.find(Advert => Advert.id === parseInt(req.params.advertId, 10));
    if (advert) {
      storage.adverts.splice(storage.adverts.indexOf(advert), 1);
      res.status(200).json(new Success(200, 'Advert successfully deleted'));
    } else {
      res.status(404).json(new Error(404, 'Advert not found'));
    }
  },
};

export default adverts;
