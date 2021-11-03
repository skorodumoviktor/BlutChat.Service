import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { UserService } from './user.service';
import {
  LoginBody, RegisterBody, UserResponse, UserToAdd,
} from './user.types';
import { API_MESSAGE_500, EMAIL_REGEX, PASSWORD_REGEX } from '../../const';
import { config } from '../../config';

@Service()
export class UserController {
  constructor(private userService: UserService) {}

  getAll = async (_: Request, res: Response) => {
    const users = await this.userService.getAll();
    res.status(200).json(users);
  };

  getById = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    if (userId) {
      const user = await this.userService.getById(userId);
      if (!user) res.status(404).send('User not found');
      res.status(200).json(user);
    } else {
      res.status(400).send('User Id is required');
    }
  };

  register = async (req: Request, res: Response) => {
    const body = req.body as RegisterBody;

    const validationResult = this.validateRegisterBody(body);
    if (validationResult) {
      res.status(400).send(validationResult);
    }

    const existingUser = await this.userService.getByEmail(body.email);
    if (existingUser) {
      res
        .status(409)
        .send('Provided email is already registered. Please login');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const userToAdd: UserToAdd = { ...body, password: hashedPassword };

    const success = await this.userService.add(userToAdd);
    if (!success) res.status(500).send(API_MESSAGE_500);

    res.status(200).end('Successfully registered! Please login');
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginBody;

    if (!(email && password)) {
      res.status(400).send('Email and password are required');
    }

    const user = await this.userService.getByEmail(email);
    const isValid = user && (await bcrypt.compare(password, user.password));

    if (!isValid) {
      res.status(400).send('Invalid credentials');
    }

    const accessToken = jwt.sign(
      { id: user?.id, email: user?.email },
      config.jwtSecret,
      {
        expiresIn: '24h',
      },
    );

    res.send(200).json({ ...user, accessToken } as UserResponse);
  };

  delete = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    if (userId) {
      const success = await this.userService.delete(userId);
      if (!success) res.status(404).json({ message: 'Not found' });
      res.status(200).end();
    } else {
      res
        .status(400)
        .json({ message: 'Bad request', description: 'userId required' });
    }
  };

  private validateRegisterBody = ({
    email,
    password,
    fullName,
  }: RegisterBody): string | null => {
    const allFieldsPresented = fullName && email && password;

    if (!allFieldsPresented) {
      return 'One of the following fields is missing: Full name, Email, Password';
    }

    if (!email.match(EMAIL_REGEX)) {
      return 'Email is invalid';
    }

    if (!password.match(PASSWORD_REGEX)) {
      return 'Password must contain minimum eight characters, at least one letter and one number';
    }

    return null;
  };
}
