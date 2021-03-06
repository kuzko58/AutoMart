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

describe('Orders Tests', () => {
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


  describe('creating a new order', () => {
    const data = {};
    const options = {
      url: 'http://localhost:5840/api/v1/order/',
      json: true,
      method: 'post',
      headers: {
        authorization: `bearer ${token}`,
      },
      body: {
        buyer: 2,
        car_id: 1,
        price: 13700000,
        amount: 12000000,
        status: 'pending',
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
        buyer: 2,
        car_id: 1,
        price: 13700000,
        price_offered: 12000000,
        status: 'pending',
      }));
    });
  });

  describe('update order price offer', () => {
    const data = {};
    const options = {
      url: 'http://localhost:5840/api/v1/order/1/price',
      json: true,
      method: 'patch',
      headers: {
        authorization: `bearer ${token}`,
      },
      body: {
        amount: 13000000,
      },
    };
    beforeAll((done) => {
      Request.patch(options, (error, response) => {
        data.status = response.statusCode;
        data.body = response.body.data;
        done();
      });
    });
    it('status 202', () => {
      expect(data.status).toBe(202);
    });
    it('response object', () => {
      expect(data.body.new_price_offered).toBe(13000000);
    });
  });

  describe('update non-existent order price offer', () => {
    const data = {};
    const options = {
      url: 'http://localhost:5840/api/v1/order/734/price',
      json: true,
      method: 'patch',
      headers: {
        authorization: `bearer ${token}`,
      },
      body: {
        amount: 13000000,
      },
    };
    beforeAll((done) => {
      Request.patch(options, (error, response) => {
        data.status = response.statusCode;
        data.body = response.body.data;
        done();
      });
    });
    it('404, item not found', () => {
      expect(data.status).toBe(404);
    });
  });

  describe('update a non-pending order price offer', () => {
    const data = {};
    const options = {
      url: 'http://localhost:5840/api/v1/order/2/price',
      json: true,
      method: 'patch',
      headers: {
        authorization: `bearer ${token}`,
      },
      body: {
        amount: 13000000,
      },
    };
    beforeAll((done) => {
      Request.patch(options, (error, response) => {
        data.status = response.statusCode;
        data.body = response.body.data;
        done();
      });
    });
    it('failed update', () => {
      expect(data.status).toBe(405);
    });
  });
});
