import { Service } from 'typedi';
import { DbService } from '../../../services/db.service';
import { Logger, LoggerInterface } from '../../../services/logger';
import { TABLE_NAME } from './user.const';
import { UserService } from './user.service';

@Service()
export class UserSchema {
  constructor(
    @Logger('UserSchema') private logger: LoggerInterface,
    private dbService: DbService,
    private userService: UserService,
  ) {}

  init = async () => this.createTable().then(this.seedTable);

  seedTable = async () => {
    this.userService
      .add({
        fullName: 'superuser',
        email: 'skorodumoviktor@gmail.com',
        password: 'SuperPassword1',
      })
      .then(() => {
        this.logger.info('table seeded');
      });
  };

  createTable = async () => this.dbService.knex.schema
    .createTable(TABLE_NAME, (table) => {
      table.increments('id');
      table.string('fullName', 250);
      table.string('password', 500);
      table.string('email', 320);
    })
    .then(() => {
      this.logger.info('table created');
    })
    .catch((error) => {
      this.logger.error(error);
    });
}
