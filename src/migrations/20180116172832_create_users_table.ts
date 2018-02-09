import * as Knex from 'knex';

const TABLE_NAME = 'users';

exports.up = (knex: Knex): Knex.SchemaBuilder => {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments('id').primary();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table
      .string('email')
      .notNullable()
      .unique();
    table
      .string('password')
      .notNullable()
      .unique();
  });
};

exports.down = (knex: Knex): Knex.SchemaBuilder => {
  return knex.schema.dropTable(TABLE_NAME);
};
