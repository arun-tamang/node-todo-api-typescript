import { Router, Request, Response, NextFunction } from 'express';
import { findUserTodo, todoValidator } from '../validators/todoValidator';
import * as tokenValidator from '../validators/tokenValidator';
import * as categoryService from '../services/categoryService';
import Category from '../models/todos';

const router: Router = Router({mergeParams: true});

// get categories
router.get('/',
  tokenValidator.validateToken,
  (req: Request, res: Response, next: NextFunction): void => {
    categoryService
      .getCategories(req.params.id)
      .then((data: any) => {
        // any is used because pagination can't be used with Model<Todo> bookshelf.
        res.json({ data, metadata: data.pagination });
      })
      .catch((err: any) => next(err));
  }
);

// add category
router.put('/',
  tokenValidator.validateToken,
  (req: Request, res: Response, next: NextFunction): void => {
    categoryService
      .addCategory(req.body.name)
      .then((data: any) => {
        res.json({data});
      })
  }
)

export default router;