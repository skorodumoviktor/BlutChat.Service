import { Service } from 'typedi';
import Knex, { Knex as KnexType } from 'knex';
import { Logger, LoggerInterface } from './logger';
import { ConfigService } from './config.service';

@Service()
export class DbService {
  public knex: KnexType;

  constructor(
  @Logger('DbService') logger: LoggerInterface,
    configService: ConfigService,
  ) {
    this.knex = Knex({
      client: 'pg',
      connection: {
        connectionString: configService.databaseUrl,
        ssl: { rejectUnauthorized: false },
      },
    });

    logger.info('initialized');
  }
}
