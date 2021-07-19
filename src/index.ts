/* eslint-disable no-console */

import 'reflect-metadata';
import dotenv from 'dotenv';
import Container from 'typedi';
import { Api } from './api';

dotenv.config();

try {
  const api = Container.get(Api);
  const apiPort = process.env.API_PORT;

  if (!apiPort) throw new Error('API_PORT is not provided');
  api.app.listen(Number(apiPort));

  console.log('INFO Api started on port', apiPort);
} catch (error) {
  console.error('ERROR Api', error.message);
}
