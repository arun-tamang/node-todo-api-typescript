import * as Knex from 'knex';
import * as Bluebird from 'bluebird';

exports.seed = (knex: Knex): Bluebird<any> => {
  // Deletes ALL existing entries
  return knex('tags_todos')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('tags_todos').insert([
        {
          todo_id: 1,
          tag_id: 3
        },
        {
          todo_id: 2,
          tag_id: 8
        },
        {
          todo_id: 3,
          tag_id: 5
        }
      ]);
    });
};
