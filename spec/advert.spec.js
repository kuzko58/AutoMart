/* eslint-env jasmine */
import Request from 'request';
import jwt from 'jsonwebtoken';
import Server from '../Server/src/server';
import storage from '../Server/storage';
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

describe('get specific advert', () => {
  const data = {};
  const options = {
    url: 'http://localhost:5840/api/v1/advert/1',
  };
  beforeAll((done) => {
    Request.get(options, (error, response, body) => {
      data.status = response.statusCode;
      data.body = body;
      done();
    });
  });
  it('status 200', () => {
    expect(data.status).toBe(200);
  });
  it('an advert object', () => {
    expect(JSON.parse(data.body)).toEqual(storage.adverts.find(ad => ad.id === 1));
  });
});

const getNonExistingItem = (addr) => {
  describe('get non-existent advert', () => {
    const data = {};
    const options = {
      url: addr,
    };
    beforeAll((done) => {
      Request.get(options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 404', () => {
      expect(data.status).toBe(404);
    });
  });
};
getNonExistingItem('http://localhost:5840/api/v1/adverts/003');

describe('get all adverts', () => {
  const data = {};
  const options = {
    url: 'http://localhost:5840/api/v1/advert/',
  };
  beforeAll((done) => {
    Request.get(options, (error, response, body) => {
      data.status = response.statusCode;
      data.body = body;
      done();
    });
  });
  it('status 200', () => {
    expect(data.status).toBe(200);
  });
  it('array of all adverts', () => {
    expect(JSON.parse(data.body)).toEqual(storage.adverts);
  });
});

describe('get all user adverts', () => {
  const data = {};
  const options = {
    url: 'http://localhost:5840/api/v1/user/1/advert/',
    headers: {
      authorization: `bearer ${token}`,
    },
  };
  beforeAll((done) => {
    Request.get(options, (error, response, body) => {
      data.status = response.statusCode;
      data.body = body;
      done();
    });
  });
  it('status 200', () => {
    expect(data.status).toBe(200);
  });
  it('array of all user adverts', () => {
    expect(JSON.parse(data.body).every(obj => obj.owner === 1)).toBe(true);
  });
});

const queryStringTest = (addr, parameter) => {
  describe('get adverts by filter(status)', () => {
    const data = {};
    const options = {
      url: addr,
    };
    beforeAll((done) => {
      Request.get(options, (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('status 200', () => {
      expect(data.status).toBe(200);
    });
    it('array of all filtered adverts', () => {
      expect(JSON.parse(data.body).every(obj => obj.status === parameter)).toBe(true);
    });
  });
};

queryStringTest('http://localhost:5840/api/v1/advert?status=available&condition=new', 'available');
queryStringTest('http://localhost:5840/api/v1/advert?status=available&condition=used', 'available');
queryStringTest('http://localhost:5840/api/v1/advert?status=available', 'available');
queryStringTest('http://localhost:5840/api/v1/advert?body_type=sedan', 'body_type');

describe('creating a new advert', () => {
  const data = {};
  const options = {
    url: 'http://localhost:5840/api/v1/advert/',
    json: true,
    method: 'post',
    headers: {
      authorization: `bearer ${token}`,
    },
    body: {
      owner: 1,
      condition: 'New',
      status: 'available',
      price: 18000000,
      brand: 'Honda',
      model: 'CR-V',
      body_type: 'SUV',
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
      owner: 1,
      condition: 'New',
      status: 'available',
      price: 18000000,
      brand: 'Honda',
      model: 'CR-V',
      body_type: 'SUV',
    });
  });
});

describe('update advert status', () => {
  const data = {};
  const options = {
    url: 'http://localhost:5840/api/v1/advert/1/status',
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
      data.body = response.body;
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

describe('update non-existent advert status', () => {
  const data = {};
  const options = {
    url: 'http://localhost:5840/api/v1/advert/00123/status',
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
      data.body = response.body;
      done();
    });
  });
  it('status 404', () => {
    expect(data.status).toBe(404);
  });
});

describe('update advert price', () => {
  const data = {};
  const options = {
    url: 'http://localhost:5840/api/v1/advert/1/price',
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
      data.body = response.body;
      done();
    });
  });
  it('status 202', () => {
    expect(data.status).toBe(202);
  });
  it('response object', () => {
    expect(data.body.price).toEqual(14000000);
  });
});
describe('deleting an advert', () => {
  const data = {};
  const options = {
    url: 'http://localhost:5840/api/v1/advert/2',
    headers: {
      authorization: `bearer ${token}`,
    },
  };
  beforeAll((done) => {
    Request.delete(options, (error, response) => {
      data.status = response.statusCode;
      data.body = response.body;
      done();
    });
  });
  it('status 200', () => {
    expect(data.status).toBe(200);
  });
  it('response object', () => {
    expect(JSON.parse(data.body).status).toBe(200);
  });
});

describe('deleting non-existent advert', () => {
  const data = {};
  const options = {
    url: 'http://localhost:5840/api/v1/advert/00123',
    headers: {
      sender: 'admin',
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
