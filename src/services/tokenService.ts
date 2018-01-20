import * as Boom from 'boom';
import { Request, Response, NextFunction } from 'express';
import * as httpError from 'http-status-codes';
import * as Bluebird from 'bluebird';
import * as jwt from '../utils/jwt';
import RfsToken from '../models/rfsTokens';
import { Tokens } from '../types/user';
import * as util from 'util';

export function fetchTokens(params: number): Tokens {
  return jwt.generateTokens(params);
}

export async function verifyRefreshToken(rfsToken: string): Bluebird<RfsToken> {
  return new RfsToken().query('where', 'name', '=', rfsToken)
    .fetch()
    .then((refsToken: RfsToken) => {
      // console.log('inside .then()');
      if (!refsToken) {
        // console.log('RefreshToken not found. Try again or login');
        throw Boom.notFound('RefreshToken not found. Try again or login');
      }
      return refsToken;
    });
}

export function fetchAccessToken(params: number): string {
  return jwt.generateAccessToken(params);
}

export function checkRefreshToken(token: string): string | object {
  return jwt.checkRefreshToken(token);
}

export function verifyAcsToken(acsToken: string, userId: number): Promise<void> {
  return jwt
    .verifyAccessToken(acsToken)
    .then((data: any) => {
      if (Number(data.encryptedData) === userId) {
        console.log('authorized');
        return;
      } else {
        throw new Error('unauthorized');
      }
    })
    .catch((err: any) => {
      throw Boom.unauthorized('invalid acess token');
    });
}

export function addRefreshToken(rfsToken: string, userId: number): Bluebird<RfsToken> {
  return new RfsToken({ user_id: userId }).fetch().then((refsToken: RfsToken) => {
    let doPatch: boolean = false;
    if (refsToken) {
      doPatch = true;
    }
    return new RfsToken()
      .where({ user_id: userId })
      .save({
        name: rfsToken,
        user_id: userId
      },
      {
        patch: doPatch
      }).then((rfrsToken: RfsToken) => rfrsToken.refresh());
  });
}

export function removeRefreshToken(rfsToken: string): Bluebird<RfsToken> {
  return new RfsToken({ name: rfsToken }).fetch().then((refsToken: RfsToken) => refsToken.destroy());
}
