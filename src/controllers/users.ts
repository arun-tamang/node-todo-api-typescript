import { Router, Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as userService from '../services/userService';
import * as jwt from '../utils/jwt';
import { findUser, userValidator } from '../validators/userValidator';
import * as tokenValidator from '../validators/tokenValidator';
import todoController from './todosController';
import { Collection } from 'bookshelf';
import User from '../models/users';

const router: Router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction): void => {
  userService
    .getAllUsers()
    .then((data: Collection<User>) => res.json({ data }))
    .catch((err: {}) => next(err));
});

router.get('/:id',
  tokenValidator.validateToken,
  (req: Request, res: Response, next: NextFunction): void => {
    userService
      .getUser(req.params.id)
      .then((data: User) => res.json({ data }))
      .catch((err: {}) => next(err));
  });

router.post('/',
  userValidator,
  (req: Request, res: Response, next: NextFunction): void => {
    userService
      .createUser(req.body)
      .then((data: User) => res.status(HttpStatus.CREATED).json({ data }))
      .catch((err: {}) => next(err));
  });

router.delete(
  '/:id',
  tokenValidator.validateToken,
  findUser,
  (req: Request, res: Response, next: NextFunction): void => {
    userService
      .deleteUser(req.params.id)
      .then((data: User) => res.status(HttpStatus.NO_CONTENT).json({ data }))
      .catch((err: {}) => next(err));
  }
);

// Handle requests for user todos.
router.use('/:id/todo', todoController);

export default router;
