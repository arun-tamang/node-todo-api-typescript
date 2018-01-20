import * as Joi from 'joi';
import validate from '../utils/validate';
import * as todoService from '../services/todoService';
import {Request, Response, NextFunction } from 'express';
import * as Bluebird from 'bluebird';

const SCHEMA = {
  name: Joi.string()
    .label('Name')
    .max(90)
    .required()
};

function todoValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

function findUserTodo(req: Request, res: Response, next: NextFunction): Bluebird<void> {
  return todoService
    .getTodo(req.params.id, 1)
    .then(() => next())
    .catch((err: any) => next(err));
}

export { findUserTodo, todoValidator };
