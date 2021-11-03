import { User } from './user.model';

export type LoginBody = {
  email: string;
  password: string;
};

export type RegisterBody = LoginBody & {
  fullName: string;
};

export type UserToAdd = Omit<User, 'id'>;

export type UserResponse = User & { accessToken: string };
