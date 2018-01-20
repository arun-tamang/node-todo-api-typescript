import * as jwt from 'jsonwebtoken';
import * as Boom from 'boom';
import { Request, Response, NextFunction } from 'express';
import { Tokens } from '../types/user';

const TOKEN_EXPIRATION_PERIOD = 3600;
const PRIVATE_KEY = 'my very much but not so much private key';

export function generateTokens(data: number): Tokens {
  return {
    accessToken: generateAccessToken(data),
    refreshToken: generateRefreshToken(data)
  };
}

export function generateAccessToken(data: number): string {
  return jwt.sign({ encryptedData: data }, PRIVATE_KEY, { expiresIn: TOKEN_EXPIRATION_PERIOD });
  // expiresIn takes time in seconds.
}

export function generateRefreshToken(data: number): string {
  return jwt.sign({ encryptedData: data }, PRIVATE_KEY, { expiresIn: (TOKEN_EXPIRATION_PERIOD * 24) });
}

export function checkRefreshToken(token: string): string | object {
  return jwt.verify(token, PRIVATE_KEY);
}

export async function verifyAccessToken(token: string): Promise<any> {
  return jwt.verify(token, PRIVATE_KEY);
}

export function verifyAccessToken2(token: string): void {
  return jwt.verify(token, 'hellofromtheotherside', (err, decode) => {
    if (!err) {
      console.log('authorized');
      return decode;
    } else {
      throw Boom.unauthorized('unauthorized user');
    }
  });
}
