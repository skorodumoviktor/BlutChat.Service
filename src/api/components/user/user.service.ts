import { Service } from 'typedi';
import { DbService } from '../../../services/db';
import { Logger, LoggerInterface } from '../../../services/logger';
import { TABLE_NAME } from './user.const';
import { User } from './user.model';
import { UserToAdd } from './user.types';

@Service()
export class UserService {
  constructor(
    private db: DbService,
    @Logger('UserService') private logger: LoggerInterface,
  ) {}

  delete = async (userId: string): Promise<boolean> => this.db
    .knex(TABLE_NAME)
    .where('userId', userId)
    .delete()
    .then(() => true)
    .catch((error) => {
      this.logger.error(error);
      return false;
    });

  add = async (user: UserToAdd): Promise<boolean> => this.db
    .knex(TABLE_NAME)
    .insert(user)
    .then(() => true)
    .catch((error) => {
      this.logger.error(error);
      return false;
    });

  getById = async (userId: string): Promise<User | null> => this.db
    .knex(TABLE_NAME)
    .where<User[]>('userId', userId)
    .then((result) => result[0])
    .catch((error) => {
      this.logger.error(error);
      return null;
    });

  getByEmail = async (email: string): Promise<User | null> => this.db
    .knex(TABLE_NAME)
    .where<User[]>('email', email)
    .then((result) => result[0])
    .catch((error) => {
      this.logger.error(error);
      return null;
    });

  getAll = async (): Promise<User[]> => this.db.knex<User>(TABLE_NAME).catch((error) => {
    this.logger.error(error);
    return [];
  });
}
