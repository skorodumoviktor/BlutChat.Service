import { Router } from 'express';
import { Service } from 'typedi';
import { UserController } from './user.controller';

@Service()
export class UserRouter {
  router: Router;

  constructor(userController: UserController) {
    this.router = Router({ mergeParams: true });

    this.router.route('/').get(userController.getAll);
    this.router.route('/').post(userController.register);

    this.router.route('/login').post(userController.login);

    this.router.route('/:userId').get(userController.getById);
    this.router.route('/:userId').delete(userController.delete);
  }
}
