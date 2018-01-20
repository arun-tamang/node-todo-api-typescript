import * as Boom from 'boom';
import { isEmpty } from 'lodash';
import { Request, Response, NextFunction } from 'express';

export default function json(request: Request, response: Response, next: NextFunction): void {
  const { body, method } = request;
  const disallowedHttpHeaders = ['PUT', 'POST', 'PATCH'];

  if (
    request.is('application/json') &&
    (disallowedHttpHeaders.indexOf(method) !== -1) &&
    isEmpty(body)
  ) {
    throw Boom.badRequest('Empty JSON');
  }

  next();
}
