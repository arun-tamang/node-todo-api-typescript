import * as Knex from 'knex';

exports.up = (knex: Knex): Knex.SchemaBuilder => {
  return knex.schema.createTable('todos', table => {
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
      .onDelete('CASCADE');
    table.dateTime('expires_at');
  });
};

exports.down = (knex: Knex): Knex.SchemaBuilder => {
  return knex.schema.dropTable('todos');
};
