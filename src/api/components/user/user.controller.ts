import { Request, Response } from 'express';
import { Service } from 'typedi';
import { UserService } from './user.service';

@Service()
export class UserController {
  constructor(private userService: UserService) {
  }

  getAll = async (req: Request, res: Response) => {
    const users = await this.userService.getAll();
    res.status(200).json({ users });
  };

  get = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    if (userId) {
      const user = await this.userService.get(userId);
      if (!user) res.status(404).json({ message: 'Not found' });
      res.status(200).json({ user });
    } else {
      res.status(400).json({ message: 'Bad request', description: 'userId required' });
    }
  };

  delete = async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    if (userId) {
      const success = await this.userService.delete(userId);
      if (!success) res.status(404).json({ message: 'Not found' });
      res.status(200).json({ }); // TODO
    } else {
      res.status(400).json({ message: 'Bad request', description: 'userId required' });
    }
  };
}
