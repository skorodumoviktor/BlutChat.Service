/* eslint-disable no-console */

import { LoggerInterface } from './logger.interface';

export class ConsoleLogger implements LoggerInterface {
  constructor(private context: string) {}

  info = (params: unknown) => {
    console.log(`INFO ${this.context} ${this.formatParams(params)}`);
  };

  error = (params: unknown) => {
    console.log(`ERROR ${this.context} ${this.formatParams(params)}`);
  };

  debug = (params: unknown) => {
    console.log(`DEBUG ${this.context} ${this.formatParams(params)}`);
  };

  private formatParams = (params: unknown): string => {
    if (typeof params === 'object') {
      return JSON.stringify(params, null, 2);
    }
    return String(params);
  };
}
