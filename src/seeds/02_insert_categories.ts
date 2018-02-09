import * as Knex from 'knex';
import * as Bluebird from 'bluebird';

exports.seed = (knex: Knex): Bluebird<any> => {
    // Deletes ALL existing entries
    return knex
      .raw('TRUNCATE TABLE categories RESTART IDENTITY CASCADE')
      .then(() => {
        // Inserts seed entries
        return knex('categories')
          .insert([
            { name: 'category1' },
            { name: 'category2' },
            { name: 'category3' }
          ]);
      });
};
