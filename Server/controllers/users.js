import bcrypt from 'bcrypt';
import auth from '../middlewares/authentication';
import db from '../database/database';

const saltRounds = 10;
const genToken = auth.generateToken;

class Error {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

const Users = {
  createUserAccount: (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      req.body.password = hash;
      const data = req.body;
      db.connect()
        .then((client) => {
          client.query('BEGIN')
            .then(() => client.query(
              'INSERT INTO users (email, first_name, last_name, password, address, is_admin) values ($1, $2, $3, $4, $5, $6)',
              [
                data.email,
                data.first_name,
                data.last_name,
                data.password,
                data.address,
                data.is_admin,
              ],
            ))
            .then(() => client.query('SELECT * FROM users WHERE email = $1', [data.email]))
            .then(result => genToken(result.rows[0]))
            .then(resolved => res.status(201).json(resolved))
            .then(() => {
              if (process.env.NODE_ENV === 'test') client.query('ROLLBACK');
              else client.query('COMMIT');
            })
            .catch((e) => {
              client.query('ROLLBACK');
              if (e.code === '23505') res.status(409).json(new Error(409, 'User already exists'));
              else res.json(e);
            })
            .finally(() => client.release());
        })
        .catch((e) => {
          if (e.code === 'ENOTFOUND') res.status(500).json(new Error(500, 'something went wrong'));
          else res.json(e);
        });
    });
  },
  logInUser: (req, res) => {
    const { email, password } = req.body;
    db.connect()
      .then((client) => {
        client.query('SELECT * FROM users WHERE email = $1', [email])
          .then((result) => {
            if (result.rows[0]) {
              bcrypt.compare(
                password, result.rows[0].password, (err, Result) => {
                  if (Result) {
                    genToken(result.rows[0])
                      .then(resolved => res.status(202).json(resolved));
                  } else {
                    res.status(401).json(new Error(401, 'email and password do not match'));
                  }
                },
              );
            } else {
              res.status(404).json(new Error(404, 'user does not exist'));
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
};

export default Users;
