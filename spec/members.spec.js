/* eslint-env jasmine */
import Request from 'request';
// import debug from 'debug';
import Server from '../Server/src/server';

const start = () => Server;
start();

describe('creating a new user', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/api/v1/auth/signup',
    json: true,
    method: 'post',
    headers: {
      sender: 'user',
    },
    body: {
      id: 10,
      email: 'johndoe2@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'Password',
      address: 'Lagos',
      isAdmin: false,
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
  it('response body', () => {
    expect(data.body).toEqual({
      id: 10,
      email: 'johndoe2@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'Password',
      address: 'Lagos',
      isAdmin: false,
    });
  });
});

describe('creating an already existing user', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/api/v1/auth/signup',
    json: true,
    method: 'post',
    headers: {
      sender: 'user',
    },
    body: {
      id: 10,
      email: 'johndoe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'Password',
      address: 'Lagos',
      isAdmin: false,
    },
  };
  beforeAll((done) => {
    Request.post(options, (error, response) => {
      data.status = response.statusCode;
      data.body = response.body;
      done();
    });
  });
  it('status 409', () => {
    expect(data.status).toBe(409);
  });
});

describe('login a user', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/api/v1/auth/signin',
    json: true,
    method: 'post',
    headers: {
      sender: 'user',
    },
    body: {
      email: 'johndoe@example.com',
      password: 'Password',
    },
  };
  beforeAll((done) => {
    Request.post(options, (error, response) => {
      data.status = response.statusCode;
      data.body = response.body;
      done();
    });
  });
  it('status 202', () => {
    expect(data.status).toBe(202);
  });
  it('response body', () => {
    expect(data.body).toEqual({
      id: 2,
      email: 'johndoe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'Password',
      address: 'Lagos',
      isAdmin: false,
    });
  });
});

describe('login a user with wrong email', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/api/v1/auth/signin',
    json: true,
    method: 'post',
    headers: {
      sender: 'user',
    },
    body: {
      email: 'johndoe25@example.com',
      password: 'Password',
    },
  };
  beforeAll((done) => {
    Request.post(options, (error, response) => {
      data.status = response.statusCode;
      data.body = response.body;
      done();
    });
  });
  it('status 404', () => {
    expect(data.status).toBe(404);
  });
});

describe('login a user with wrong password', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/api/v1/auth/signin',
    json: true,
    method: 'post',
    headers: {
      sender: 'user',
    },
    body: {
      email: 'johndoe@example.com',
      password: 'Password2',
    },
  };
  beforeAll((done) => {
    Request.post(options, (error, response) => {
      data.status = response.statusCode;
      data.body = response.body;
      done();
    });
  });
  it('status 401', () => {
    expect(data.status).toBe(401);
  });
});
