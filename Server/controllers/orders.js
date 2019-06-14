import storage from '../storage';

class Error {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

const orders = {
  createNewOrder: (req, res) => {
    const Res = {
      status: 201,
      data: Object.assign({ created_on: new Date() }, req.body),
    };
    storage.orders.push(Res.data);
    res.status(Res.status).json(Res.data);
  },
  updateOrderPrice: (req, res) => {
    const Res = {
      status: 202,
      data: { last_modified: new Date() },
    };
    const order = storage.orders.find(Order => Order.id === parseInt(req.params.orderId, 10));
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
  },
};


export default orders;
