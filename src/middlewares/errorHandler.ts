import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import * as HttpStatus from 'http-status-codes';
import buildError from '../utils/buildError';

export function notFoundError(err: any, req: Request, res: Response, next: NextFunction): void {
  console.log('notFoundError error...............');
  res.status(HttpStatus.NOT_FOUND).json({
    error: {
      code: HttpStatus.NOT_FOUND,
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
    }
  });
}

export function methodNotAllowed(err: any, req: Request, res: Response, next: NextFunction): void {
  console.log('methodNotAllowed error...............');
  res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
    error: {
      code: HttpStatus.METHOD_NOT_ALLOWED,
      message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED)
    }
  });
}

export function bodyParser(err: any, req: Request, res: Response, next: NextFunction): void {
  console.log('bodyParser error...............');
  logger.error(err);

  res.status(err.status).json({
    error: {
      code: err.status,
      message: HttpStatus.getStatusText(err.status)
    }
  });
}

// export function authorizationError(err: any, req: Request, res: Response, next: NextFunction): void {
//   if (err.output.statusCode && err.output.statusCode === 401) {
//     console.log('authorization error...............');
//     logger.error(err);
//     const error = buildError(err);
//     res.status(error.code).json({ error });
//   } else {
//     next(err);
//   }
// }

export function genericErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
  console.log('generic error...............');
  logger.error(err);
  const error = buildError(err);
  res.status(error.code).json({ error });
}
