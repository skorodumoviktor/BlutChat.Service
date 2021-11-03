import { Request, Response } from 'express';
import { Service } from 'typedi';
import { UserToAdd } from './user.model';
import { UserService } from './user.service';

@Service()
export class UserController {
  constructor(private userService: UserService) {}

  getAll = async (_: Request, res: Response) => {
    const users = await this.userService.getAll();
    res.status(200).json(users);
  };

  get = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    if (userId) {
      const user = await this.userService.get(userId);
      if (!user) res.status(404).json({ message: 'Not found' });
      res.status(200).json(user);
    } else {
      res
        .status(400)
        .json({ message: 'Bad request', description: 'userId required' });
    }
  };

  add = async (req: Request, res: Response) => {
    const userToAdd = req.body as UserToAdd;
    if (userToAdd) {
      if (!userToAdd.fullName) {
        res
          .status(400)
          .json({ message: 'Bad request', description: 'user is not valid' });
      }

      const success = await this.userService.add(userToAdd);
      if (!success) res.status(500).json({ message: 'Something went wrong' });
      res.status(200);
    } else {
      res
        .status(400)
        .json({ message: 'Bad request', description: 'user required' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    if (userId) {
      const success = await this.userService.delete(userId);
      if (!success) res.status(404).json({ message: 'Not found' });
      res.status(200);
    } else {
      res
        .status(400)
        .json({ message: 'Bad request', description: 'userId required' });
    }
  };

  initDb = async () => {
    await this.userService.createTable();
    await this.userService.seedTable();
  };
}
