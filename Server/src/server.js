import express from 'express';
import logger from 'morgan';
import Debug from 'debug';
import 'dotenv/config';

import usersRouter from '../Routes/users';

const debug = Debug('AutoMart');
const app = express();

app.use(logger('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(JSON.stringify('Hello world!'));
});

app.use('/api/v1', (req, res) => {
  usersRouter(req, res);
});

const port = process.env.PORT || 5840;
const server = app.listen(port, () => debug(`Listening on ${port}...`));

export default server;
