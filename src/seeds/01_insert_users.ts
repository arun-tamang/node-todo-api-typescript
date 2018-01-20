import * as Knex from 'knex';
import * as Bluebird from 'bluebird';

exports.seed = (knex: Knex): Bluebird<any> => {
  // Deletes ALL existing entries
  return knex
    .raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE')
    .then( () => {
      // Inserts seed entries
      return knex('users').insert([
        {
          first_name: 'Jane',
          last_name: 'Doe',
          email: 'jane12@mail.com',
          password: 'password1',
          updated_at: new Date()
        },
        {
          first_name: 'John',
          last_name: 'Doe',
          email: 'johnny@bravo.com',
          password: 'password2',
          updated_at: new Date()
        }
      ]);
    });
};
