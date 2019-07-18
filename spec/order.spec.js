/* eslint-env jasmine */
import Request from 'request';
import jwt from 'jsonwebtoken';
import Server from '../Server/src/server';
import auth from '../Server/middlewares/authentication';

const start = () => Server;
start();

const genToken = auth.generateToken;
const Admin = {
    email: 'kuzko584@gmail.com',
    firstName: 'Chisom',
    lastName: 'Amaechi',
    password: 'mypassword',
    address: 'Lagos',
    isAdmin: true,
  }

const token = jwt.sign(Admin, process.env.secret_key)

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
      carId: 1,
      price: 13700000,
      price_offer: 12000000,
      status: 'pending',
    },
  };
  beforeAll((done) => {
    Request.post(options, (error, response) => {
      data.status = response.statusCode;
      data.body = response.body;
      done();
    });
  });
  it('status 201', () => {
    expect(data.status).toBe(201);
  });
  it('response object', () => {
    expect(data.body).toEqual({
      buyer: 2,
      carId: 1,
      price: 13700000,
      price_offer: 12000000,
      status: 'pending',
    });
  });
});

describe('update order price offer', () => {
  const data = {};
  const options = {
    url: 'http://localhost:5840/api/v1/order/4/price',
    json: true,
    method: 'patch',
    headers: {
      authorization: `bearer ${token}`,
    },
    body: {
      price_offer: 13000000,
    },
  };
  beforeAll((done) => {
    Request.patch(options, (error, response) => {
      data.status = response.statusCode;
      data.body = response.body;
      done();
    });
  });
  it('status 202', () => {
    expect(data.status).toBe(202);
  });
  it('response object', () => {
    expect(data.body.new_price_offer).toEqual(13000000);
  });
});

describe('update non-existent order price offer', () => {
  const data = {};
  const options = {
    url: 'http://localhost:5840/api/v1/order/34/price',
    json: true,
    method: 'patch',
    headers: {
      authorization: `bearer ${token}`,
    },
    body: {
      price_offer: 13000000,
    },
  };
  beforeAll((done) => {
    Request.patch(options, (error, response) => {
      data.status = response.statusCode;
      data.body = response.body;
      done();
    });
  });
  it('status 404', () => {
    expect(data.status).toBe(404);
  });
});

describe('update a non-pending order price offer', () => {
  const data = {};
  const options = {
    url: 'http://localhost:5840/api/v1/order/5/price',
    json: true,
    method: 'patch',
    headers: {
      authorization: `bearer ${token}`,
    },
    body: {
      price_offer: 13000000,
    },
  };
  beforeAll((done) => {
    Request.patch(options, (error, response) => {
      data.status = response.statusCode;
      data.body = response.body;
      done();
    });
  });
  it('status 405', () => {
    expect(data.status).toBe(405);
  });
});
