import express from 'express';
import { Service } from 'typedi';
import { UserRouter } from './components/user/user.router';

@Service()
export class Api {
  app: express.Express;

  constructor(private userRouter: UserRouter) {
    this.app = express();
    this.initRouter();
  }

  private initRouter = () => {
    this.app.use('/users', this.userRouter.router);
  };
}
