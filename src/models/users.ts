import bookshelf from '../db';
import * as bookshelfjs from 'bookshelf';
import * as BlueBird from 'bluebird';

const TABLE_NAME = 'users';

class User extends bookshelf.Model<User> {
  get tableName(): string {
    return TABLE_NAME;
  }

  get hasTimestamps(): boolean {
    return true;
  }

  public static getUserByEmail(email: string): BlueBird<User> {
    return this.where('email', email).fetch();
  }

  public static getUserByPassword(password: string): BlueBird<User> {
    return this.where('password', password).fetch();
  }
}

export default User;
