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

function advertFilter(arr) {
  let filteredArr = arr[0];
  let index = 1;
  let result = null;

  function filterEngine() {
    if (arr.length === 0) return arr;
    if (arr.length === 1) return filteredArr;
    if (index === arr.length) return result;
    result = filteredArr.filter(obj => arr[index].find(obj2 => obj.id === obj2.id));
    filteredArr = result;
    index += 1;
    return filterEngine();
  }
  const result2 = filterEngine();
  return result2;
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
  updateAdvertStatus: (req, res) => {
    const Res = {
      status: 202,
      data: {},
    };
    const advert = storage.adverts.find(Advert => Advert.id === parseInt(req.params.advertId, 10));
    if (advert) {
      advert.status = req.body.status;
      Object.assign(Res.data, advert);
    } else {
      Res.status = 404;
      Res.data = new Error(404, 'not  found');
    }
    res.status(Res.status).json(Res.data);
  },
  updateAdvertPrice: (req, res) => {
    const Res = {
      status: 202,
      data: {},
    };
    const advert = storage.adverts.find(Advert => Advert.id === parseInt(req.params.advertId, 10));
    if (advert) {
      advert.price = req.body.price;
      Object.assign(Res.data, advert);
    } else {
      Res.status = 404;
      Res.data = new Error(404, 'not found');
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
    const unFilteredAdverts = [];
    if (req.query.status) {
      const allAdsForUnsoldCars = storage.adverts.filter(ad => ad.status === req.query.status);
      unFilteredAdverts.push(allAdsForUnsoldCars);
    }
    if (req.query.body_type) {
      const allAdsByBody = storage.adverts.filter(ad => ad.bodyType === req.query.body_type);
      unFilteredAdverts.push(allAdsByBody);
    }
    if (req.query.brand) {
      const allAdsByBrand = storage.adverts.filter(ad => ad.brand === req.query.brand);
      unFilteredAdverts.push(allAdsByBrand);
    }
    if (req.query.condition) {
      const allAdsByCondition = storage.adverts.filter(ad => ad.condition === req.query.condition);
      unFilteredAdverts.push(allAdsByCondition);
    }
    if (req.query.min_price) {
      const reqToInt = parseInt(req.query.min_price, 10);
      const allAdsAboveMin = storage.adverts.filter(ad => ad.price >= reqToInt);
      unFilteredAdverts.push(allAdsAboveMin);
    }
    if (req.query.max_price) {
      const reqToInt = parseInt(req.query.max_price, 10);
      const allAdsBelowMax = storage.adverts.filter(ad => ad.price <= reqToInt);
      unFilteredAdverts.push(allAdsBelowMax);
    }
    if (unFilteredAdverts.length && unFilteredAdverts.every(arr => arr.length > 0)) {
      const filteredAdverts = advertFilter(unFilteredAdverts);
      res.status(200).json(filteredAdverts);
    } else res.status(204).json(new Error(204, 'No cars found with the specifications'));
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
