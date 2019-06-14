/* eslint-env jasmine */
import Request from 'request';
// import debug from 'debug';
import Server from '../Server/src/server';

const start = () => Server;
start();

describe('creating a new order', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/api/v1/order/',
    json: true,
    method: 'post',
    headers: {
      sender: 'user',
    },
    body: {
      created_on: '',
      id: 24,
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
      created_on: '',
      id: 24,
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
    url: 'http://localhost:3000/api/v1/order/4/price',
    json: true,
    method: 'patch',
    headers: {
      sender: 'user',
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
    expect(data.body.new_price_offer).toBe(13000000);
  });
});
