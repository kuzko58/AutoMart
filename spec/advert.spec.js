/* eslint-env jasmine */
import Request from 'request';
// import debug from 'debug';
import Server from '../Server/src/server';
import storage from '../Server/storage';

const start = () => Server;
start();

describe('get specific advert', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/api/v1/advert/1',
    headers: {
      sender: 'user',
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
  it('an advert object', () => {
    expect(JSON.parse(data.body)).toEqual(storage.adverts.find(ad => ad.id === 1));
  });
});

describe('get nonexistent advert', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/api/v1/adverts/003',
    headers: {
      sender: 'user',
    },
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

describe('get all adverts', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/api/v1/advert/',
    headers: {
      sender: 'admin',
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
  it('array of all adverts', () => {
    expect(JSON.parse(data.body)).toEqual(storage.adverts);
  });
});

describe('get all user adverts', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/api/v1/user/1/advert/',
    headers: {
      sender: 'user',
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

describe('get adverts by filter', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/api/v1/advert?status=available',
    headers: {
      sender: 'user',
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
  it('array of all filtered adverts', () => {
    expect(JSON.parse(data.body).every(obj => obj.status === 'available')).toBe(true);
  });
});

describe('creating a new advert', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/api/v1/advert/',
    json: true,
    method: 'post',
    headers: {
      sender: 'user',
    },
    body: {
      id: 5,
      owner: 1,
      created_on: '21-05-2019',
      condition: 'New',
      status: 'available',
      price: 18000000,
      manufacturer: 'Honda',
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
      id: 5,
      owner: 1,
      created_on: '21-05-2019',
      condition: 'New',
      status: 'available',
      price: 18000000,
      manufacturer: 'Honda',
      model: 'CR-V',
      body_type: 'SUV',
    });
  });
});

describe('update advert status', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/api/v1/advert/1/status',
    json: true,
    method: 'patch',
    headers: {
      sender: 'user',
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

describe('update advert price', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/api/v1/advert/1/price',
    json: true,
    method: 'patch',
    headers: {
      sender: 'user',
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
    expect(data.body.price).toBe(14000000);
  });
});
describe('deleting an advert', () => {
  const data = {};
  const options = {
    url: 'http://localhost:3000/api/v1/advert/2',
    headers: {
      sender: 'admin',
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
