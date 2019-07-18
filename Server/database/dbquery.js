const createDb = `

CREATE TABLE users (
id SERIAL NOT NULL PRIMARY KEY,
email VARCHAR(150) NOT NULL,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
password VARCHAR(150) NOT NULL,
address VARCHAR(50) NOT NULL,
is_admin BOOL NOT NULL DEFAULT FALSE,
UNIQUE(email));

INSERT INTO users (
email,
first_name,
last_name,
password,
address)
VALUES ('johndoe@example.com','John','Doe','$2b$10$Os63evCMu2BrtmWPK6yJMevjvdFOE0vSu9yBXadzDb2Ilj85dfie6','Lagos');

INSERT INTO users (
email,
first_name,
last_name,
password,
address)
VALUES ('janedoe@example.com','Jane','Doe','password','Abuja');

INSERT INTO users (
email,
first_name,
last_name,
password,
address)
VALUES ('jackryan@example.com','Jack','Ryan','password','Lagos');

CREATE TABLE Cars (
  id SERIAL NOT NULL PRIMARY KEY,
  owner  INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  state VARCHAR(20) NOT NULL,
  status VARCHAR(20) NOT NULL,
  price FLOAT NOT NULL,
  manufacturer VARCHAR NOT NULL,
  model VARCHAR(50) NOT NULL,
  body_type VARCHAR(50) NOT NULL,
  photo VARCHAR(200) [] NOT NULL,
  created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_modified TIMESTAMPTZ
);

INSERT INTO Cars (
owner,
state,
status,
price,
manufacturer,
model,
body_type,
photo)
VALUES (1, 'new', 'available', 13700000, 'Toyota', 'Avalon', 'sedan', ARRAY ['ghgjuuru']);

INSERT INTO Cars (
owner,
state,
status,
price,
manufacturer,
model,
body_type,
photo)
VALUES (1, 'new', 'available', 18000000, 'Honda', 'CR-V', 'SUV', ARRAY ['ghgjuuru']);

INSERT INTO Cars (
owner,
state,
status,
price,
manufacturer,
model,
body_type,
photo)
VALUES (3, 'used', 'available', 8000000, 'Ford', 'Edge', 'SUV', ARRAY ['ghgjuuru']);

INSERT INTO Cars (
owner,
state,
status,
price,
manufacturer,
model,
body_type,
photo)
VALUES (2, 'used', 'available', 10000000, 'Ford', 'Edge', 'SUV', ARRAY ['ghgjuuru']);

CREATE TABLE orders (
  id SERIAL NOT NULL PRIMARY KEY,
  buyer  INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  car_id  INT REFERENCES cars(id) ON DELETE CASCADE NOT NULL,
  price FLOAT NOT NULL,
  price_offered FLOAT NOT NULL,
  old_price_offered FLOAT,
  new_price_offered FLOAT,
  status VARCHAR(20) NOT NULL,
  created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_modified TIMESTAMPTZ
);

INSERT INTO orders (
buyer,
car_id,
price,
price_offered,
status,
created_on)
VALUES (2, 1, 13700000, 11500000, 'pending', NOW());

INSERT INTO orders (
buyer,
car_id,
price,
price_offered,
status,
created_on)
VALUES (3, 2, 1800000, 15000000, 'rejected', NOW());

CREATE TABLE flags (
  id SERIAL NOT NULL PRIMARY KEY,
  car_id  INT REFERENCES cars(id) ON DELETE CASCADE NOT NULL,
  reason VARCHAR(50) NOT NULL,
  description VARCHAR(150) NOT NULL,
  created_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO flags (
car_id,
reason,
description,
created_on)
VALUES (3, 'fraudulent', 'some description...', NOW());`;

const dropDb = 'DROP TABLE flags, orders, cars, users;';

export default { createDb, dropDb };
