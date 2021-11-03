import { NextFunction, Response, Request as ExpressRequest } from 'express';
import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { ConfigService } from '../../services/config.service';
// import { UserService } from '../components/user/user.service';

// const userService = Container.get(UserService);

type Request = ExpressRequest & { userId: string };

@Service()
export class AuthMiddleware {
  constructor(private configService: ConfigService) {}

  verifyToken = (req: ExpressRequest, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'] as string;

    if (!token) {
      res.status(403).send('No token provided!');
      return;
    }

    jwt.verify(token, this.configService.jwtToken, (err, decoded) => {
      if (err || !decoded) {
        res.status(401).send('Unauthorized!');
        return;
      }
      (<Request>req).userId = decoded.id as string;
      next();
    });
  };

  // isAdmin: (req: Request, res: Response, next: NextFunction) => {
  //   userService.getById(req.userId).then((user) => {
  //     user.getRoles().then((roles) => {
  //       for (let i = 0; i < roles.length; i++) {
  //         if (roles[i].name === 'admin') {
  //           next();
  //           return;
  //         }
  //       }

  //       res.status(403).send({
  //         message: 'Require Admin Role!',
  //       });
  //     });
  //   });
  // },
}
