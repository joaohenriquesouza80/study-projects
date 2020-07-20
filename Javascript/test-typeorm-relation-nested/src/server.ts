import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';

import './database';

import errorHandler from './error/errorHandler';
import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.use(errorHandler);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
