import * as Knex from 'knex';

const TABLE_NAME = 'tags';

export function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments();
    table
      .string('name')
      .notNullable()
      .unique();
  });
}

export function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable(TABLE_NAME);
}
