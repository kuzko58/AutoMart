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

class Methods {
  constructor(location, id) {
    this.location = location;
    this.id = id;
  }

  createNewContent(req, res) {
    storage[this.location].push(req.body);
    res.status(201).json(req.body);
  }

  updateContent(req, res) {
    const item = storage[this.location].find(obj => obj.id === parseInt(req.params[this.id], 10));
    if (item) {
      Object.assign(item, req.body);
      res.status(202).json(item);
    } else res.status(404).json(new Error(404, 'not found'));
  }

  getSpecificContent(req, res) {
    const item = storage[this.location].find(obj => obj.id === parseInt(req.params[this.id], 10));
    if (item) res.status(200).json(item);
    else res.status(404).json(new Error(404, 'not found'));
  }

  getAllContent(req, res) {
    const allItems = storage[this.location];
    res.status(200).json(allItems);
  }

  getAllUserContent(req, res) {
    let userContent = storage[this.location];
    userContent = userContent.filter(obj => obj.owner === parseInt(req.params.userId, 10));
    if (userContent.length) res.status(200).json(userContent);
    else res.status(404).json(new Error(404, `No adverts found for this user: ${req.params.userId}`));
  }

  deleteContent(req, res) {
    const item = storage[this.location].find(obj => obj.id === parseInt(req.params[this.id], 10));
    if (item) {
      storage[this.location].splice(storage[this.location].indexOf(item), 1);
      res.status(200).json(new Success(200, 'Advert successfully deleted'));
    } else res.status(404).json(new Error(404, 'Advert not found'));
  }
}

class Adverts extends Methods {
  getAllAdverts(req, res) {
    let filteredAdverts = storage[this.location].slice();
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
  }
}

class Orders extends Methods {
  updateOrderPrice(req, res) {
    const order = storage[this.location].find(obj => obj.id === parseInt(req.params[this.id], 10));
    if (order) {
      if (order.status === 'pending') {
        order.old_price_offer = order.price_offer;
        order.new_price_offer = req.body.price_offer;
        delete order.price_offer;
        res.status(202).json(order);
      } else res.status(405).json(new Error(405, 'This order cannot be changed'));
    } else res.status(404).json(new Error(404, 'not found'));
  }
}

const adverts = new Adverts('adverts', 'advertId');
const orders = new Orders('orders', 'orderId');
const flags = new Methods('flags', 'flagId');

export default {
  adverts,
  orders,
  flags,
};
