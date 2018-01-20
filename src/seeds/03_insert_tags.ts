import * as Knex from 'knex';
import * as Bluebird from 'bluebird';

exports.seed = (knex: Knex): Bluebird<any> => {
  // Deletes ALL existing entries
  return knex
    .raw('TRUNCATE TABLE tags RESTART IDENTITY CASCADE')
    .then(() => {
      // Inserts seed entries
      return knex('tags').insert([
        { name: 'person' },
        { name: 'nature' },
        { name: 'vehicle' },
        { name: 'building' },
        { name: 'food' },
        { name: 'all' },
        { name: 'gadgets'},
        { name: 'movies'}
      ]);
    });
};
