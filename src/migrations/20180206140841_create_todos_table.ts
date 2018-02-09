import * as Knex from 'knex';

const TABLE_NAME = 'todos';

exports.up = (knex: Knex): Knex.SchemaBuilder => {
  return knex.schema.createTable(TABLE_NAME, table => {
    table.increments();
    table.timestamps(true, true);
    table.string('name').notNullable();
    table
      .boolean('completed')
      .notNullable()
      .defaultTo(false);
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .notNullable()
      .onDelete('CASCADE');
    table.dateTime('expires_at');
    table
      .integer('category_id')
      .references('id')
      .inTable('categories')
      .notNullable()
      .onDelete('CASCADE');
  });
};

exports.down = (knex: Knex): Knex.SchemaBuilder => {
  return knex.schema.dropTable(TABLE_NAME);
};
