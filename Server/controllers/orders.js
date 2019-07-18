import db from '../database/database';

class Error {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

const Orders = {
  createNewOrder: (req, res) => {
    const data = req.body;
    db.connect()
      .then((client) => {
        client.query('BEGIN')
          .then(() => client.query(
            `INSERT INTO orders (buyer, car_id, price, price_offered, status)
         values ($1, $2, $3, $4, $5)`,
            [data.buyer, data.car_id, data.price, data.amount, data.status],
          ))
          .then(() => client.query('SELECT * FROM orders WHERE buyer = $1 ORDER BY created_on DESC', [data.buyer]))
          .then(result => res.status(201).json({ status: 201, data: result.rows[0] }))
          .then(() => {
            if (process.env.NODE_ENV === 'test') client.query('ROLLBACK');
            else client.query('COMMIT');
          })
          .catch((e) => {
            client.query('ROLLBACK');
            res.status(400).json({ status: 400, data: e });
          })
          .finally(() => client.release());
      })
      .catch((e) => {
        if (e.code === 'ENOTFOUND') res.status(500).json({ status: 500, data: new Error(500, 'something went wrong') });
        else res.status(400).json(res.status(400).json({ status: 400, data: e }));
      });
  },
  updateOrder: (req, res) => {
    const { orderId } = req.params;
    const data = req.body;
    db.connect()
      .then((client) => {
        client.query('SELECT * FROM orders WHERE id = $1', [orderId])
          .then((result) => {
            if (result.rows[0]) {
              if (result.rows[0].status === 'pending') {
                client.query('UPDATE orders SET old_price_offered = price_offered, new_price_offered = $1, last_modified = (to_timestamp($4 / 1000.0)) WHERE id = $2 AND status = $3',
                  [data.amount, orderId, 'pending', Date.now()])
                  .then(() => client.query('SELECT * FROM orders WHERE id = $1', [orderId]))
                  .then(Result => res.status(202).json({ status: 202, data: Result.rows[0] }));
              } else {
                res.status(405).json({ status: 405, data: new Error(405, 'This order has been closed') });
              }
            } else {
              res.status(404).json({ status: 404, data: new Error(404, 'not found') });
            }
          })
          .catch(e => res.status(400).json({ status: 400, data: e }))
          .finally(() => client.release());
      })
      .catch((e) => {
        if (e.code === 'ENOTFOUND') res.status(500).json({ status: 500, data: new Error(500, 'something went wrong') });
        else res.status(400).json(res.status(400).json({ status: 400, data: e }));
      });
  },
};

export default Orders;
