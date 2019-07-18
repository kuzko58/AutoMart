/* eslint-env jasmine */
import Request from 'request';
import jwt from 'jsonwebtoken';
import debug from 'debug';
import Server from '../Server/src/server';
import db from '../Server/database/database';
import refresh from '../Server/database/dbquery';

const start = () => Server;
start();

const Admin = {
  email: 'kuzko584@gmail.com',
  first_name: 'Chisom',
  last_name: 'Amaechi',
  password: 'mypassword',
  address: 'Lagos',
  is_admin: true,
};

const token = jwt.sign(Admin, process.env.secret_key);
const { createDb, dropDb } = refresh;

describe('Flags Tests', () => {
  beforeAll((done) => {
    process.env.NODE_ENV = 'test';
    db.connect()
      .then(
        client => client.query(createDb)
          .catch(e => debug(e))
          .finally(() => client.release()),
      )
      .catch(e => debug(e))
      .finally(() => done());
  });
  afterAll((done) => {
    process.env.NODE_ENV = 'none';
    db.connect()
      .then(
        client => client.query(dropDb)
          .catch(e => debug(e))
          .finally(() => client.release()),
      )
      .catch(e => debug(e))
      .finally(() => done());
  });


  describe('creating a new flag', () => {
    const data = {};
    const options = {
      url: 'http://localhost:5840/api/v1/flag/',
      json: true,
      method: 'post',
      headers: {
        authorization: `bearer ${token}`,
      },
      body: {
        car_id: 1,
        reason: 'fraudulent',
        description: 'String',
      },
    };
    beforeAll((done) => {
      Request.post(options, (error, response) => {
        data.status = response.statusCode;
        data.body = response.body.data;
        done();
      });
    });
    it('status 201', () => {
      expect(data.status).toBe(201);
    });
    it('response object', () => {
      expect(data.body).toEqual(jasmine.objectContaining({
        car_id: 1,
        reason: 'fraudulent',
        description: 'String',
      }));
    });
  });
});
