import express from 'express';
import logger from 'morgan';
import Debug from 'debug';
import 'dotenv/config';

import usersRouter from '../Routes/users';
// import adminRouter from '../Routes/admin';

const debug = Debug('AutoMart');
const app = express();

app.use(logger('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(JSON.stringify('Hello world!'));
});

app.use('/api/v1', (req, res) => {
  usersRouter(req, res);
  /* const sender = req.get('sender');
    if (sender === 'user') {
    usersRouter(req, res);
  } else if (sender === 'admin') {
    adminRouter(req, res);
  } else {
    res.send('something went wrong');
  } */
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => debug(`Listening on ${port}...`));

export default server;
