import db from '../database/database';

const Flags = {
  createNewFlag: (req, res) => {
    const data = req.body;
    db.connect()
      .then((client) => {
        client.query('BEGIN')
          .then(() => client.query(
            `INSERT INTO flags (car_id, reason, description)
         values ($1, $2, $3)`,
            [data.car_id, data.reason, data.description],
          ))
          .then(() => client.query('SELECT * FROM flags WHERE car_id = $1 ORDER BY created_on DESC', [data.car_id]))
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
};

export default Flags;
