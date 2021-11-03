import { Router } from 'express';
import { Service } from 'typedi';
import { UserController } from './user.controller';

@Service()
export class UserRouter {
  router: Router;

  constructor(userController: UserController) {
    this.router = Router({ mergeParams: true });

    this.router.route('/').get(userController.getAll).post(userController.add);

    this.router
      .route('/:userId')
      .get(userController.get)
      .delete(userController.delete);
  }
}
