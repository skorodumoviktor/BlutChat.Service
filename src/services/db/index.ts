import { Service } from 'typedi';
import Knex, { Knex as KnexType } from 'knex';
import { Logger, LoggerInterface } from '../logger';

@Service()
export class DbService {
  public knex: KnexType;

  constructor(@Logger('DbService') logger: LoggerInterface) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DbService DATABASE_URL is not provided');
    }

    this.knex = Knex({
      client: 'pg',
      connection: {
        connectionString,
        ssl: { rejectUnauthorized: false },
      },
    });

    logger.info('initialized');
  }
}
