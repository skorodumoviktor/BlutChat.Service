import { Service } from 'typedi';
import { DbService } from '../../../services/db';
import { Logger, LoggerInterface } from '../../../services/logger';
import { TABLE_NAME } from './role.const';
import { RoleService } from './role.service';
import { RoleEnum } from './role.types';

@Service()
export class RoleSchema {
  constructor(
    @Logger('RoleSchema') private logger: LoggerInterface,
    private db: DbService,
    private roleService: RoleService,
  ) {}

  init = async () => {
    await this.createTable();
    await this.seedTable();
  };

  seedTable = async () => {
    await this.roleService.add({
      id: RoleEnum.admin,
      name: 'admin',
    });

    await this.roleService.add({
      id: RoleEnum.user,
      name: 'user',
    });
  };

  createTable = async () => this.db.knex.schema
    .createTable(TABLE_NAME, (table) => {
      table.increments('id');
      table.string('name', 50);
    })
    .catch((error) => {
      this.logger.error(error);
    });
}
