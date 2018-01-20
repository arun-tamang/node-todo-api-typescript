import { Router, Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as userService from '../services/userService';
import * as jwt from '../utils/jwt';
import { findUser, userValidator } from '../validators/userValidator';
import { findUserTodo, todoValidator } from '../validators/todoValidator';
import * as tokenValidator from '../validators/tokenValidator';
import * as todoService from '../services/todoService';
import { Collection } from 'bookshelf';
import User from '../models/users';
import Todo from '../models/todos';

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

router.get(
  '/:id/todo/search',
  tokenValidator.validateToken,
  (req: Request, res: Response, next: NextFunction): void => {
    todoService
      .searchTodo(req.params.id, req.query)
      .then((data: any) => {  // any used instead of Collection<Todo> to use .pagination
        res.json({ data, metadata: data.pagination });
      })
      .catch(err => next(err));
  }
);
// It is crucial that you put search before the following .get because it matches /search as well.

// Handle requests for user todos.
router.get(
  '/:id/todo/:pageNo',
  tokenValidator.validateToken,
  (req: Request, res: Response, next: NextFunction): void => {
    todoService
      .getTodo(req.params.id, req.params.pageNo)
      .then((data: any) => {  // any is used because pagination can't be used with Model<Todo> bookshelf.
        res.json({ data, metadata: data.pagination });
      })
      .catch(err => next(err));
  }
);

router.post('/',
  userValidator,
  (req: Request, res: Response, next: NextFunction): void => {
    userService
      .createUser(req.body)
      .then((data: User) => res.status(HttpStatus.CREATED).json({ data }))
      .catch((err: {}) => next(err));
  });

router.put(
  '/:id/todo',
  tokenValidator.validateToken,
  findUserTodo,
  (req: Request, res: Response, next: NextFunction): void => {
    todoService
      .createTodo(req.params.id, req.body)
      .then((data: Todo) => res.json(data))
      .catch((err: {}) => next(err));
  }
);

// now to edit individual todo
router.put(
  '/:id/todo/:todoId',
  tokenValidator.validateToken,
  (req: Request, res: Response, next: NextFunction): void => {
    todoService
      .editTodo(req.params.todoId, req.body.name)
      .then((data: Todo) => res.json({ data }))
      .catch((err: {}) => next(err));
  }
);

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

router.delete(
  '/:id/todo/:todoId',
  tokenValidator.validateToken,
  (req: Request, res: Response, next: NextFunction): void => {
    todoService
      .deleteTodo(req.params.todoId)
      .then((data: string) => {
        // paginateTodo(data);
        res.json(data);
        // return ('successfully deleted todoId: ' + todoId);
      })
      .catch((err: {}) => next(err));
  }
);

export default router;
