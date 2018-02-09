import * as Knex from 'knex';

const TABLE_NAME = 'categories';

exports.up = (knex: Knex): Knex.SchemaBuilder => {
  return knex.schema.createTable(TABLE_NAME, (table: Knex.CreateTableBuilder) => {
    table.increments();
    table.string('name').notNullable().unique();
  })
};

exports.down = (knex: Knex): Knex.SchemaBuilder => {
  return knex.schema.dropTable(TABLE_NAME);
};
