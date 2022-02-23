import { Service } from 'typedi';
import { DbService } from '../../../services/db.service';
import { Logger, LoggerInterface } from '../../../services/logger';
import { TABLE_NAME } from './role.const';
import { Role } from './role.model';

@Service()
export class RoleService {
  constructor(
    private db: DbService,
    @Logger('RoleService') private logger: LoggerInterface,
  ) {}

  add = async (role: Role): Promise<boolean> => this.db
    .knex(TABLE_NAME)
    .insert(role)
    .then(() => true)
    .catch((error) => {
      this.logger.error(error);
      return false;
    });

  getById = async (id: string): Promise<Role | null> => this.db
    .knex(TABLE_NAME)
    .where<Role[]>('id', id)
    .then((result) => result[0])
    .catch((error) => {
      this.logger.error(error);
      return null;
    });

  getAll = async (): Promise<Role[]> => this.db.knex<Role>(TABLE_NAME).catch((error) => {
    this.logger.error(error);
    return [];
  });
}
