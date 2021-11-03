import { Service } from 'typedi';
import { DbService } from '../../../services/db.service';
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

  delete = async (id: string): Promise<boolean> => this.db
    .knex(TABLE_NAME)
    .where('id', id)
    .delete()
    .then(() => true)
    .catch((error) => {
      this.logger.error(error);
      return false;
    });

  add = async (userToAdd: UserToAdd): Promise<boolean> => this.db
    .knex(TABLE_NAME)
    .insert(userToAdd)
    .then(() => true)
    .catch((error) => {
      this.logger.error(error);
      return false;
    });

  getById = async (id: string): Promise<User | null> => this.db
    .knex(TABLE_NAME)
    .where<User[]>('id', id)
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
