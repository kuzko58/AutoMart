/* eslint-env jasmine */
import Request from 'request';
// import debug from 'debug';
import Server from '../Server/src/server';

const start = () => Server;
start();

describe('creating a new order', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/api/v1/flag/',
    json: true,
    method: 'post',
    headers: {
      sender: 'user',
    },
    body: {
      created_on: '',
      id: 2,
      carId: 1,
      reason: 'fraudulent',
      description: 'String',
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
      id: 2,
      carId: 1,
      reason: 'fraudulent',
      description: 'String',
    });
  });
});
