import { Router, Request, Response, NextFunction } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as tagService from '../services/tagService';
import * as tokenValidator from '../validators/tokenValidator';
import { RequestHandler } from 'express-serve-static-core';
import { Collection } from 'bookshelf';
import Tags from '../models/tags';

const router: Router = Router();

router.get('/:id', tokenValidator.validateToken, (req: Request, res: Response, next: NextFunction): void => {
  tagService
    .getAllTags()
    .then((data: Collection<Tags>) => {
      res.json({ data });
    })
    .catch((err: any) => next(err));
});

export default router;
