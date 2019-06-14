const storage = {
  users: [{
    id: 2,
    email: 'johndoe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'Password',
    address: 'Lagos',
    isAdmin: false,
  }],
  adverts: [{
    id: 1,
    owner: 2,
    created_on: '',
    condition: 'New',
    status: 'available',
    price: 13700000,
    brand: 'Toyota',
    model: 'Avalon',
    body_type: 'Sedan',

  },
  {
    id: 2,
    owner: 1,
    created_on: '',
    condition: 'New',
    status: 'available',
    price: 13700000,
    brand: 'Toyota',
    model: 'Avalon',
    body_type: 'Sedan',

  }],
  orders: [{
    created_on: '',
    id: 4,
    buyer: 2,
    carId: 1,
    price: 13700000,
    price_offer: 11000000,
    status: 'pending',
  }],
  flags: [{
    id: 1,
    carId: 1,
    created_on: '',
    reason: 'fraudulent',
    description: 'String',
  }],
};

export default storage;
