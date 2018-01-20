import * as Knex from 'knex';

export function up(knex: Knex): Knex.SchemaBuilder {
  // the table: Knex.CreateTableBuilder is unnecessary here because table is not passed by us.
  return knex.schema.createTable('tags_todos', (table: Knex.CreateTableBuilder) => {
    table.increments();
    table
      .integer('todo_id')
      .references('id')
      .inTable('todos')
      .onDelete('CASCADE');
    table
      .integer('tag_id')
      .references('id')
      .inTable('tags')
      .onDelete('CASCADE');
  });
}

export function down(knex: Knex): Knex.SchemaBuilder {
  return knex.schema.dropTable('tags_todos');
}
