import { Pool, QueryResult } from 'pg';
import { Service } from 'typedi';
import { Logger, LoggerInterface } from './logger';

export type TableColumn = {
  name: string
  type: string
  constraints?: string
};
export type CreateTableParams = {
  name: string
  columns: TableColumn[]
  constraints?: string
};

export type ExecuteQueryResult =
  | { success: true, result: QueryResult }
  | { success: false, message: string };

@Service()
export class DbService {
  public pool: Pool;

  constructor(@Logger('DbService') private logger: LoggerInterface) {
    const connectionString = process.env.DATABASE_URI;

    if (!connectionString) {
      throw new Error('DbService DATABASE_URI is not provided');
    }

    this.pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    logger.info('initialized');
  }

  end = async () => {
    await this.pool.end();
    this.logger.info('ended');
  };

  executeQuery = async (text: string, values?: string[]): Promise<ExecuteQueryResult> => {
    try {
      if (values && values.length > 0) {
        const result = await this.pool.query({ text, values });
        return { success: true, result };
      }

      const result = await this.pool.query(text);
      return { success: true, result };
    } catch (error) {
      this.logger.error(String(error));
      return { success: false, message: String(error) };
    }
  };
}
