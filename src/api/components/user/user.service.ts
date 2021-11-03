import { Service } from 'typedi';
import { DbService } from '../../../services/db';
import { Logger, LoggerInterface } from '../../../services/logger';
import { User, UserToAdd } from './user.model';

@Service()
export class UserService {
  private tableName = 'user';

  constructor(
    private db: DbService,
    @Logger('UserService') private logger: LoggerInterface,
  ) {}

  delete = async (userId: string): Promise<boolean> => this.db
    .knex(this.tableName)
    .where('userId', userId)
    .delete()
    .then(() => true)
    .catch((error) => {
      this.logger.error(error);
      return false;
    });

  add = async (userToAdd: UserToAdd): Promise<boolean> => this.db
    .knex(this.tableName)
    .insert(userToAdd)
    .then(() => true)
    .catch((error) => {
      this.logger.error(error);
      return false;
    });

  get = async (userId: string): Promise<User | null> => this.db
    .knex(this.tableName)
    .where<User[]>('userId', userId)
    .then((result) => result[0])
    .catch((error) => {
      this.logger.error(error);
      return null;
    });

  getAll = async (): Promise<User[]> => this.db.knex<User>(this.tableName).catch((error) => {
    this.logger.error(error);
    return [];
  });

  seedTable = async () => {
    this.db
      .knex(this.tableName)
      .insert({ fullName: 'Test User' })
      .then(() => true)
      .catch((error) => {
        this.logger.error(error);
        return false;
      });
  };

  createTable = async () => this.db.knex.schema.createTable(this.tableName, (table) => {
    table.increments('userId');
    table.string('fullName', 250);
  });
}
