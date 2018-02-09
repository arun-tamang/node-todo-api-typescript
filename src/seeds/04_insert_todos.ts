import * as Knex from 'knex';
import * as Bluebird from 'bluebird';

exports.seed = (knex: Knex): Bluebird<any> => {
  // Deletes ALL existing entries
  return knex('todos')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('todos').insert([
        {
          name: 'clean my car',
          user_id: 1,
          category_id: 1,
          updated_at: new Date()
        },
        {
          name: 'go to the movie-theater',
          user_id: 2,
          category_id: 1,
          updated_at: new Date()
        },
        {
          name: 'buy fruits',
          user_id: 2,
          category_id: 2,
          updated_at: new Date()
        }
      ]);
    });
};
