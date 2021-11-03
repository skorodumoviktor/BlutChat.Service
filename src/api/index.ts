import express, { Router } from 'express';
import { Service } from 'typedi';
import { UserRouter } from './components/user/user.router';
import { UserSchema } from './components/user/user.schema';

@Service()
export class Api {
  app: express.Express;

  constructor(private userRouter: UserRouter, private userSchema: UserSchema) {
    const app = express();
    app.use(express.json());
    this.app = app;
  }

  initRouter = () => {
    const apiRouter = Router();

    apiRouter.use('/users', this.userRouter.router);

    this.app.use('/api', apiRouter);
  };

  initSchemas = async () => Promise.all([this.userSchema.init()]);
}
