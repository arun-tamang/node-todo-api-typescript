import { Router, Request, Response, NextFunction } from 'express';
import { findUserTodo, todoValidator } from '../validators/todoValidator';
import * as tokenValidator from '../validators/tokenValidator';
import * as todoService from '../services/todoService';
import Todo from '../models/todos';

const router: Router = Router({ mergeParams: true });

// search todos
router.get(
  '/search',
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

// get todos
router.get('/:pageNo',
  tokenValidator.validateToken,
  (req: Request, res: Response, next: NextFunction): void => {
    todoService
      .getTodo(req.params.id, req.params.pageNo)
      .then((data: any) => {  // any is used because pagination can't be used with Model<Todo> bookshelf.
        res.json({ data, metadata: data.pagination });
      })
      .catch((err: any) => next(err));
  }
);

// add a new todo
router.post(
  '/',
  tokenValidator.validateToken,
  findUserTodo,
  (req: Request, res: Response, next: NextFunction): void => {
    todoService
      .createTodo(req.params.id, req.body)
      .then((data: Todo) => res.json(data))
      .catch((err: any) => next(err));
  }
);

// now to edit individual todo
router.put(
  '/:todoId',
  tokenValidator.validateToken,
  (req: Request, res: Response, next: NextFunction): void => {
    if(req.body.name) {
      todoService
        .editTodo(req.params.todoId, req.body.name)
        .then((data: Todo) => res.json({ data }))
        .catch((err: any) => next(err));
    } else {
      todoService
        .setTodoCompleted(req.params.todoId, req.body.isCompleted)
        .then((data: Todo) => res.json({data}))
        .catch((err: any) => next(err));
    }
  }
);

// delete a todo
router.delete(
  '/:todoId',
  tokenValidator.validateToken,
  (req: Request, res: Response, next: NextFunction): void => {
    todoService
      .deleteTodo(req.params.todoId)
      .then((data: string) => {
        res.json(data);
      })
      .catch((err: any) => next(err));
  }
);

export default router;