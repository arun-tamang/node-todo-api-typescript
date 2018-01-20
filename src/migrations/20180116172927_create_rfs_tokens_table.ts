import * as Knex from 'knex';

export function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable('rfs_tokens', table => {
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
  return knex.schema.dropTable('rfs_tokens');
}
