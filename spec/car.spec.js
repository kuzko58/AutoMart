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
const { createDb, dropDb } = refresh;
const token = jwt.sign(Admin, process.env.secret_key);

describe('Cars Tests', () => {
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


  describe('get specific car', () => {
    const data = {};
    const options = {
      url: 'http://localhost:5840/api/v1/car/1',
    };
    beforeAll((done) => {
      Request.get(options, (error, response, body) => {
        data.status = response.statusCode;
        const Body = JSON.parse(body);
        data.body = Body.data;
        done();
      });
    });
    it('status 200', () => {
      expect(data.status).toBe(200);
    });
    it('an advert object', () => {
      expect(data.body.id).toBe(1);
    });
  });

  const getNonExistingItem = (addr) => {
    describe('get non-existent car', () => {
      const data = {};
      const options = {
        url: addr,
      };
      beforeAll((done) => {
        Request.get(options, (error, response, body) => {
          data.status = response.statusCode;
          const Body = JSON.parse(body);
          data.body = Body.data;
          done();
        });
      });
      it('404', () => {
        expect(data.status).toBe(404);
      });
    });
  };
  getNonExistingItem('http://localhost:5840/api/v1/car/39899');

  describe('get all cars', () => {
    const data = {};
    const options = {
      url: 'http://localhost:5840/api/v1/car/',
    };
    beforeAll((done) => {
      Request.get(options, (error, response, body) => {
        data.status = response.statusCode;
        const Body = JSON.parse(body);
        data.body = Body.data;
        done();
      });
    });
    it('status 200', () => {
      expect(data.status).toBe(200);
    });
    it('array of all cars', () => {
      const isArray = value => value && typeof value === 'object' && value.constructor === Array;
      expect(isArray(data.body)).toBe(true);
    });
  });

  describe('get all user cars', () => {
    const data = {};
    const options = {
      url: 'http://localhost:5840/api/v1/user/1/car/',
      headers: {
        authorization: `bearer ${token}`,
      },
    };
    beforeAll((done) => {
      Request.get(options, (error, response, body) => {
        data.status = response.statusCode;
        const Body = JSON.parse(body);
        data.body = Body.data;
        done();
      });
    });
    it('status 200', () => {
      expect(data.status).toBe(200);
    });
    it('array of all user cars', () => {
      expect(data.body.every(obj => obj.owner === 1)).toBe(true);
    });
  });

  const queryStringTest = (addr, parameter, key) => {
    describe('get cars by filter status)', () => {
      const data = {};
      const options = {
        url: addr,
      };
      beforeAll((done) => {
        Request.get(options, (error, response, body) => {
          data.status = response.statusCode;
          const Body = JSON.parse(body);
          data.body = Body.data;
          done();
        });
      });
      it('status 200', () => {
        expect(data.status).toBe(200);
      });
      it('array of all filtered cars', () => {
        expect(data.body.every(obj => obj[key] === parameter)).toBe(true);
      });
    });
  };

  queryStringTest('http://localhost:5840/api/v1/car?status=available&state=new', 'available', 'status');
  queryStringTest('http://localhost:5840/api/v1/car?status=available&state=used', 'available', 'status');
  queryStringTest('http://localhost:5840/api/v1/car?status=available', 'available', 'status');
  queryStringTest('http://localhost:5840/api/v1/car?body_type=sedan', 'sedan', 'body_type');

  describe('creating a new car', () => {
    const data = {};
    const options = {
      url: 'http://localhost:5840/api/v1/car/',
      json: true,
      method: 'post',
      headers: {
        authorization: `bearer ${token}`,
      },
      body: {
        owner: 1,
        state: 'New',
        status: 'available',
        price: 18000000,
        manufacturer: 'Honda',
        model: 'CR-V',
        body_type: 'SUV',
        photo: ['this is a test'],
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
        owner: 1,
        state: 'New',
        status: 'available',
        price: 18000000,
        manufacturer: 'Honda',
        model: 'CR-V',
        body_type: 'SUV',
        photo: ['this is a test'],
      }));
    });
  });

  describe('update car status', () => {
    const data = {};
    const options = {
      url: 'http://localhost:5840/api/v1/car/1/status',
      json: true,
      method: 'patch',
      headers: {
        authorization: `bearer ${token}`,
      },
      body: {
        status: 'sold',
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
      expect(data.body.status).toBe('sold');
    });
  });

  describe('update non-existent car status', () => {
    const data = {};
    const options = {
      url: 'http://localhost:5840/api/v1/car/16677/status',
      json: true,
      method: 'patch',
      headers: {
        authorization: `bearer ${token}`,
      },
      body: {
        status: 'sold',
      },
    };
    beforeAll((done) => {
      Request.patch(options, (error, response) => {
        data.status = response.statusCode;
        data.body = response.body.data;
        done();
      });
    });
    it('404, not found', () => {
      expect(data.status).toBe(404);
    });
  });

  describe('update advert price', () => {
    const data = {};
    const options = {
      url: 'http://localhost:5840/api/v1/car/1/price',
      json: true,
      method: 'patch',
      headers: {
        authorization: `bearer ${token}`,
      },
      body: {
        price: 14000000,
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
      expect(data.body.price).toBe(14000000);
    });
  });

  describe('deleting an car advert', () => {
    const data = {};
    const options = {
      url: 'http://localhost:5840/api/v1/car/3',
      headers: {
        authorization: `bearer ${token}`,
      },
    };
    beforeAll((done) => {
      Request.delete(options, (error, response) => {
        data.status = response.statusCode;
        data.body = response.body.data;
        done();
      });
    });
    it('status 200', () => {
      expect(data.status).toBe(200);
    });
  });

  describe('deleting non-existent car advert', () => {
    const data = {};
    const options = {
      url: 'http://localhost:5840/api/v1/car/123',
      headers: {
        authorization: `bearer ${token}`,
      },
    };
    beforeAll((done) => {
      Request.patch(options, (error, response) => {
        data.status = response.statusCode;
        data.body = response.body.data;
        done();
      });
    });
    it('status 404', () => {
      expect(data.status).toBe(404);
    });
  });
});
