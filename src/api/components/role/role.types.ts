import { Role } from './role.model';

export type RoleToAdd = Omit<Role, 'id'>;

export enum RoleEnum {
  admin,
  user,
}
