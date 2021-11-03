import express, { Router } from 'express';
import { Service } from 'typedi';
import { UserController } from './components/user/user.controller';
import { UserRouter } from './components/user/user.router';

@Service()
export class Api {
  app: express.Express;

  constructor(
    private userRouter: UserRouter,
    private userController: UserController,
  ) {
    this.app = express();
  }

  initRouter = () => {
    const apiRouter = Router();

    apiRouter.use('/users', this.userRouter.router);

    this.app.use('/api', apiRouter);
  };

  initComponentDbs = async () => Promise.all([this.userController.initDb()]);
}
