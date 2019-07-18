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
      carId: 1,
      reason: 'fraudulent',
      description: 'String',
    });
  });
});
