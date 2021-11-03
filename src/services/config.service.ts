import { Service } from 'typedi';
import { Logger, LoggerInterface } from './logger';

@Service()
export class ConfigService {
  jwtToken: string;

  databaseUrl: string;

  constructor(@Logger('ConfigService') logger: LoggerInterface) {
    this.jwtToken = process.env.JWT_TOKEN || '';
    if (!this.jwtToken) {
      logger.error('JWT_TOKEN is not provided');
    }

    this.databaseUrl = process.env.DATABASE_URL || '';
    if (!this.databaseUrl) {
      logger.error('DATABASE_URL is not provided');
    }
  }
}
