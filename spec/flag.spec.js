/* eslint-env jasmine */
import Request from 'request';
import jwt from 'jsonwebtoken';
import Server from '../Server/src/server';

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

describe('Flags Tests', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test';
  });
  afterAll(() => {
    process.env.NODE_ENV = 'none';
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
        data.body = response.body;
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
