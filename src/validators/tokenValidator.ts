import * as tokenService from '../services/tokenService';
import { Request, Response, NextFunction } from 'express';

// token stuffs
export function validateToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization;
  tokenService
    .verifyAcsToken(String(token), Number(req.params.id))
    .then(() => next())
    .catch(err => next(err));
}

export function validateRefreshToken(req: Request, res: Response, next: NextFunction): void {
  tokenService
    .verifyRefreshToken(String(req.headers.authorization))
    .then(() => next())
    .catch((err: any) => next(err));
}
