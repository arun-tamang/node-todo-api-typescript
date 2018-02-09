import * as Knex from 'knex';

const TABLE_NAME = 'rfs_tokens';

export function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments();
    table.timestamps(true, true);
    table
      .string('name')
      .notNullable()
      .unique();
    table
      .string('user_id')
      .notNullable()
      .unique();
  });
}

export function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable(TABLE_NAME);
}
