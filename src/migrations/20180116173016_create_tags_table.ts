import * as Knex from 'knex';

export function up(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.createTable('tags', table => {
    table.increments();
    table
      .string('name')
      .notNullable()
      .unique();
  });
}

export function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable('tags');
}
