import * as Boom from 'boom';
import * as Bluebird from 'bluebird';
import { Collection, Model } from 'bookshelf';
import User from '../models/users';
import * as HttpStatus from 'http-status-codes';
import * as tokenService from './tokenService';
import * as jwt from '../utils/jwt.js';
import * as JWT from 'jsonwebtoken';
import { UserToPost, UserLogin, ValidateUser } from '../types/user';

export function getAllUsers(): Bluebird<Collection<User>> {
  return User.fetchAll();
}

export function getUser(id: number): Bluebird<User> {
  return new User({ id }).fetch().then((user: User) => {
    if (!user) {
      throw Boom.notFound('User not found');
    }

    return user;
  });
}

export function createUser(user: UserToPost): Bluebird<User> {
  // user parameter is json object u pass
  return new User({
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    password: user.password
  })
    .save()
    .then((newUser: User) => newUser.refresh());
}

export function deleteUser(id: number): Bluebird<User> {
  return new User({ id }).fetch().then((user: User) => user.destroy());
}

export function validateUser(loginParams: UserLogin): Bluebird<ValidateUser> {
  const email: string = loginParams.email;
  const password: string = loginParams.password;
  return User
    .getUserByEmail(email)
    .then((rawUserInfo: User) => {
      if (rawUserInfo === null) {
        throw Boom.unauthorized('wrong email or password');
      }
      const userInfo = rawUserInfo.toJSON();
      if (userInfo.password === password) {
        return { validated: true, userInfo };
      } else {
        // wrong password or username
        return { validated: false, userInfo };
      }
    });
}
