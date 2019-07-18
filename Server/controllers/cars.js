import db from '../database/database';

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

const Cars = {

  createNewAdvert: (req, res) => {
    const data = req.body;
    db.connect()
      .then((client) => {
        client.query('BEGIN')
          .then(() => client.query(
            'INSERT INTO cars (owner, state, status, price, manufacturer, model, body_type, photo) values ($1, $2, $3, $4, $5, $6, $7, $8)',
            [
              data.owner,
              data.state,
              data.status,
              data.price,
              data.manufacturer,
              data.model,
              data.body_type,
              data.photo,
            ],
          ))
          .then(() => client.query('SELECT * FROM cars WHERE owner = $1 ORDER BY created_on DESC', [data.owner]))
          .then(result => res.status(201).json(result.rows[0]))
          .then(() => {
            if (process.env.NODE_ENV === 'test') client.query('ROLLBACK');
            else client.query('COMMIT');
          })
          .catch((e) => {
            client.query('ROLLBACK');
            res.json(e);
          })
          .finally(() => client.release());
      })
      .catch((e) => {
        if (e.code === 'ENOTFOUND') res.status(500).json(new Error(500, 'something went wrong'));
        else res.json(e);
      });
  },

  updateAdvert: (req, res) => {
    const { carId } = req.params;
    const { price, status } = req.body;
    db.connect()
      .then((client) => {
        client.query('SELECT * FROM cars WHERE id = $1', [carId])
          .then((result) => {
            if (result.rows[0]) {
              client.query('UPDATE cars SET price = COALESCE($1, price), status = COALESCE($2, status), last_modified = (to_timestamp($4 / 1000.0)) WHERE id = $3',
                [price, status, carId, Date.now()])
                .then(() => client.query('SELECT * FROM cars WHERE id = $1', [carId]))
                .then(Result => res.status(202).json(Result.rows[0]));
            } else {
              res.status(404).json(new Error(404, 'not found'));
            }
          })
          .catch(e => res.json(e))
          .finally(() => client.release());
      })
      .catch((e) => {
        if (e.code === 'ENOTFOUND') res.status(500).json(new Error(500, 'something went wrong'));
        else res.json(e);
      });
  },

  getSpecificAdvert: (req, res) => {
    const { carId } = req.params;
    db.connect()
      .then((client) => {
        client.query('SELECT * FROM cars WHERE id = $1', [carId])
          .then((result) => {
            if (result.rows[0]) res.status(200).json(result.rows[0]);
            else res.status(404).json(new Error(404, 'not found'));
          })
          .catch(e => res.json(e))
          .finally(() => client.release());
      })
      .catch((e) => {
        if (e.code === 'ENOTFOUND') res.status(500).json(new Error(500, 'something went wrong'));
        else res.json(e);
      });
  },

  getAllUserAdvert: (req, res) => {
    const { userId } = req.params;
    db.connect()
      .then((client) => {
        client.query('SELECT * FROM cars WHERE owner = $1', [userId])
          .then(result => res.status(200).json(result.rows))
          .catch(e => res.json(e))
          .finally(() => client.release());
      })
      .catch((e) => {
        if (e.code === 'ENOTFOUND') res.status(500).json(new Error(500, 'something went wrong'));
        else res.json(e);
      });
  },

  getAllAdverts: (req, res) => {
    const data = req.query;
    db.connect()
      .then((client) => {
        client.query(
          'SELECT * FROM cars WHERE status = COALESCE($1, status) AND manufacturer = COALESCE($2, manufacturer) AND state = COALESCE($3, state) AND body_type = COALESCE($4, body_type) AND price > COALESCE($5, 0) AND price < COALESCE($6, 500000000)',
          [
            data.status,
            data.manufacturer,
            data.state,
            data.body_type,
            data.min_price,
            data.max_price,
          ],
        )
          .then(result => res.status(200).json(result.rows))
          .catch(e => res.json(e))
          .finally(() => client.release());
      })
      .catch((e) => {
        if (e.code === 'ENOTFOUND') res.status(500).json(new Error(500, 'something went wrong'));
        else res.json(e);
      });
  },

  deleteAdvert: (req, res) => {
    const { carId } = req.params;
    db.connect()
      .then((client) => {
        client.query('BEGIN')
          .then(() => client.query('SELECT * FROM cars WHERE id = $1', [carId]))
          .then((result) => {
            if (result.rows[0]) {
              client.query('DELETE FROM cars WHERE id = $1', [carId])
                .then(() => res.status(200).json(new Success(200, 'Advert successfully deleted')));
            } else {
              res.status(404).json(new Error(404, 'not found'));
            }
          })
          .then(() => {
            if (process.env.NODE_ENV === 'test') client.query('ROLLBACK');
            else client.query('COMMIT');
          })
          .catch((e) => {
            client.query('ROLLBACK');
            res.json(e);
          })
          .finally(() => client.release());
      })
      .catch((e) => {
        if (e.code === 'ENOTFOUND') res.status(500).json(new Error(500, 'something went wrong'));
        else res.json(e);
      });
  },
};

export default Cars;
