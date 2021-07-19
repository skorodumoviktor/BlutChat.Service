import { Service } from 'typedi';
import { DbService, TableColumn } from '../../../services/db.service';
import { HelperService } from '../../../services/helper.service';
import { Logger, LoggerInterface } from '../../../services/logger';
import { User, UserToAdd } from './user.model';

@Service()
export class UserService {
  constructor(private db: DbService, @Logger('UserService') private logger: LoggerInterface, private helper: HelperService) {
  }

  delete = async (userId: string): Promise<boolean> => {
    const query = `delete from "user" where user_id=${userId}`;
    const result = await this.db.executeQuery(query);

    if (!result.success) {
      this.logger.error(result.message);
    }

    return result.success;
  };

  add = async (userToAdd: UserToAdd): Promise<boolean> => {
    const columns = ['full_name'];
    const values = [userToAdd.fullName];
    const query = `insert into "user" (${columns.join(',')}) values ${values.join(',')}`;
    const result = await this.db.executeQuery(query);

    if (!result.success) {
      this.logger.error(result.message);
    }

    return result.success;
  };

  get = async (userId: string): Promise<User | null> => {
    const query = `select * from "user" where "user_id"=${userId}`;
    const result = await this.db.executeQuery(query);

    if (result.success) {
      return result.result.rows[0] as User;
    }

    return null;
  };

  getAll = async (): Promise<User[]> => {
    const query = 'select * from "user"';
    const result = await this.db.executeQuery(query);

    if (result.success) {
      return result.result.rows as User[];
    }

    return [];
  };

  seedTable = async () => {
    this.logger.info('seeding table');

    const query = this.helper.getTableSeedingQuery({ name: 'user', columns: ['full_name'], values: ['Test User'] });
    const result = await this.db.executeQuery(query);

    if (result.success) {
      this.logger.info('table seeded');
    }
  };

  createTable = async () => {
    this.logger.info('creating table');

    const columns: TableColumn[] = [
      { name: 'user_id', type: 'serial', constraints: 'primary key' },
      { name: 'full_name', type: 'varchar(200)', constraints: 'not null' },
    ];

    const query = this.helper.getTableCreationQuery({ name: 'user', columns });
    const result = await this.db.executeQuery(query);

    if (result.success) {
      this.logger.info('table created');
    }
  };
}
