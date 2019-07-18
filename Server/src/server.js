import express from 'express';
import logger from 'morgan';
import Debug from 'debug';
import 'dotenv/config';
import routes from '../Routes/routes';

const debug = Debug('AutoMart');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use('/api/v1', (req, res) => {
  routes(req, res);
});

app.get('/', (req, res) => {
  res.send(JSON.stringify('Hello world!'));
});

const port = process.env.PORT || 5840;
const server = app.listen(port, () => debug(`Listening on ${port}...`));

export default server;
