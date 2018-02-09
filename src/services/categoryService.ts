
import * as Boom from 'boom';
import * as Bluebird from 'bluebird';
import * as Knex from 'knex';
import { Collection, Model } from 'bookshelf';
import Category from '../models/categories';
import * as HttpStatus from 'http-status-codes';
import { UserToPost, UserLogin, ValidateUser } from '../types/user';

export function getCategories(userId: number): Bluebird<Collection<Category>> {
  return (new Category).fetchAll({
    withRelated: [
      {
        'todos': (query: Knex.QueryBuilder) => query
          .where({ user_id: userId })
          .orderBy('expires_at', 'ASC')
      },
      {
        'todos.tags': (query: Knex.QueryBuilder) => query.orderBy('id')
      }
    ]
  });
}

export function addCategory(name: string) {
  return new Category()
    .save({name})
    .then((newCategory: Category) => {
      newCategory.refresh();
      return newCategory;
    });
}
