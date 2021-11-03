/* eslint-disable no-console */

import 'reflect-metadata';
import dotenv from 'dotenv';
import Container from 'typedi';
import { Api } from './api';

dotenv.config();

async function main() {
  try {
    const api = Container.get(Api);
    await api.initSchemas();
  } catch (error) {
    console.error('ERROR', (<{ message: string }>error).message);
  }
}

main();
