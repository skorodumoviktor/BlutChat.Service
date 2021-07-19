import { Service } from 'typedi';
import { CreateTableParams } from './db.service';

type SeedTableParams = { name: string; columns: string[]; values: string[] };

@Service()
export class HelperService {
  getTableCreationQuery = ({ name, columns, constraints }: CreateTableParams): string => {
    const columnStrings = columns.map((column) => `${column.name} ${column.type} ${column.constraints || ''}`);
    return `create table "${name}" (${columnStrings.join(',')}${constraints ? ` ,${constraints}` : ''})`;
  };

  getTableSeedingQuery = ({ name, columns, values }: SeedTableParams): string => `
    insert into "${name}" (${columns.join(',')}) select ${values.map((v) => `'${v}'`).join(',')}
    where not exists (select * from "${name}")
  `;
}
