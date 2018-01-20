import * as Boom from 'boom';
import * as Bluebird from 'bluebird';
import * as userService from './userService';
import * as tokenService from './tokenService';
import { Request, Response, NextFunction } from 'express';
import RfsToken from '../models/rfsTokens';
import User from '../models/users';
import { LoginResult, ValidateUser } from '../types/user';
import rfsTokens from '../models/rfsTokens';
import { Tokens } from '../types/user';

export function register(req: Request, res: Response, next: NextFunction): Bluebird<User> {
  return userService.createUser(req.body);
}

export function logout(req: Request, res: Response, next: NextFunction): Bluebird<RfsToken> {
  const rfsToken = req.headers.authorization;
  return tokenService
    .removeRefreshToken(String(rfsToken))
    .then((logoutResult: RfsToken) => logoutResult);
}

export function login(req: Request, res: Response, next: NextFunction): Bluebird<LoginResult> {
  return userService
    .validateUser(req.body)
    .then((validationResult: ValidateUser) => {
      if (validationResult.validated === true) {
        // Now you can give token to the client.
        const tokens: Tokens = tokenService.fetchTokens(validationResult.userInfo.id);
        tokenService.addRefreshToken(tokens.refreshToken, validationResult.userInfo.id);

        return { userInfo: validationResult.userInfo, tokens };
      } else {
        // wrong email or password
        throw Boom.unauthorized('wrong email or password');
      }
    });
}

export async function refreshAccessToken(token: string): Promise<string> {
  try {
    const decoded: any = tokenService.checkRefreshToken(token);
    return tokenService.fetchAccessToken(decoded.encryptedData);
  } catch {
    throw Boom.notFound('refreshToken may have expired');
  }
  
}
