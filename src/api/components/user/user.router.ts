import { Router } from 'express';
import { Service } from 'typedi';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { UserController } from './user.controller';

@Service()
export class UserRouter {
  router: Router;

  constructor(
    private userController: UserController,
    private authMiddleware: AuthMiddleware,
  ) {
    const router = Router({ mergeParams: true });

    router
      .route('/')
      .get([this.authMiddleware.verifyToken, this.userController.getAll]);
    router.route('/').post(this.userController.register);

    router.route('/login').post(this.userController.login);

    router.route('/:userId').get(this.userController.getById);
    router.route('/:userId').delete(this.userController.delete);

    this.router = router;
  }
}
