/* eslint-env jasmine */
import Request from 'request';
import debug from 'debug';
import Server from '../Server/src/server';
import db from '../Server/database/database';
import refresh from '../Server/database/dbquery';

const { createDb, dropDb } = refresh;
const start = () => Server;
start();


describe('Users Tests', () => {
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

  describe('creating a new user', () => {
    const data = {};
    const options = {
      url: 'http://localhost:5840/api/v1/auth/signup',
      json: true,
      method: 'post',
      body: {
        email: 'johndoe3@example.com',
        first_name: 'John',
        last_name: 'Doe',
        password: 'Password',
        address: 'Lagos',
        is_admin: false,
      },
    };
    beforeAll((done) => {
      // process.env.NODE_ENV = 'test';
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
      expect(data.body).toEqual(jasmine.objectContaining({
        email: 'johndoe3@example.com',
        first_name: 'John',
        last_name: 'Doe',
      }));
    });
  });

  describe('creating an already existing user', () => {
    const data = {};
    const options = {
      url: 'http://localhost:5840/api/v1/auth/signup',
      json: true,
      method: 'post',
      headers: {
        sender: 'user',
      },
      body: {
        email: 'johndoe@example.com',
        first_name: 'John',
        last_name: 'Doe',
        password: 'Password',
        address: 'Lagos',
        is_admin: false,
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
      url: 'http://localhost:5840/api/v1/auth/signin',
      json: true,
      method: 'post',
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
      expect(data.body.email).toBe('johndoe@example.com');
    });
  });

  describe('login a non-existing user', () => {
    const data = {};
    const options = {
      url: 'http://localhost:5840/api/v1/auth/signin',
      json: true,
      method: 'post',
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
      url: 'http://localhost:5840/api/v1/auth/signin',
      json: true,
      method: 'post',
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
});
