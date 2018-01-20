import { Router, Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as adminService from '../services/adminService';
import * as userService from '../services/userService';
import { findUser, userValidator } from '../validators/userValidator';
import * as tokenValidator from '../validators/tokenValidator';
import RfsToken from '../models/rfsTokens';
import User from '../models/users';
import { LoginResult } from 'src/types/user';

const router: Router = Router();

router.post('/register',
  userValidator,
  (req: Request, res: Response, next: NextFunction): void => {
    adminService
      .register(req, res, next)
      .then((data: User) => res.status(HttpStatus.CREATED).json({ data }))
      .catch((err: any) => next(err));;
  });

router.post('/login', (req: Request, res: Response, next: NextFunction): void => {
  adminService
    .login(req, res, next)
    .then((data: LoginResult) => res.json(data))
    .catch(e => next(e));
});

router.post(
  '/refresh',
  tokenValidator.validateRefreshToken,
  (req: Request, res: Response, next: NextFunction): void => {
    adminService
      .refreshAccessToken(String(req.headers.authorization))
      .then((accessToken: string) => res.json({ accessToken }))
      .catch(err => next(err));
  }
);

router.delete(
  '/logout',
  tokenValidator.validateRefreshToken,
  (req: Request, res: Response, next: NextFunction): void => {
    adminService
      .logout(req, res, next)
      .then((data: RfsToken) => res.json({ data, message: 'successfully logged out' }))
      .catch(e => next(e));
  }
);

export default router;
