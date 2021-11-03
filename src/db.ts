/* eslint-disable no-console */

import 'reflect-metadata';
import dotenv from 'dotenv';
import Container from 'typedi';
import { Api } from './api';

dotenv.config();

try {
  const api = Container.get(Api);
  api.initComponentDbs();
} catch (error) {
  console.error('ERROR', (<{ message: string }>error).message);
}
