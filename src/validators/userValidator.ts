import * as Joi from 'joi';
import * as Bluebird from 'bluebird';
import validate from '../utils/validate';
import * as userService from '../services/userService';
import { Request, Response, NextFunction } from 'express';

const SCHEMA = {
  firstName: Joi.string()
    .alphanum()
    .max(90)
    .required(),
  lastName: Joi.string()
    .alphanum()
    .max(90)
    .required(),
  email: Joi.string()
    .required(),
  password: Joi.string()
    .required()
};

function userValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

function findUser(req: Request, res: Response, next: NextFunction): Bluebird<void> {
  return userService
    .getUser(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findUser, userValidator };
