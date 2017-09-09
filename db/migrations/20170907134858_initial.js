
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('user', (table) => {
      table.increments('id').primary();
      table.string('email', 64).unique().notNullable();
      table.string('first_name', 64).notNullable();
      table.string('last_name', 64).notNullable();
      table.string('password').notNullable();
      table.string('token').notNullable();
      table.timestamps(true, true);
    }),
    knex.schema.createTable('folder', (table) => {
      table.increments('id').primary();
      table.string('name', 64).unique().notNullable();
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('user.id');
      table.timestamps(true, true);
    }),
    knex.schema.createTable('quiz', (table) => {
      table.increments('id').primary();
      table.string('name', 64).notNullable();
      table.integer('folder_id').unsigned();
      table.foreign('folder_id').references('folder.id');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('user.id');
      table.string('subject', 64);
      table.string('type', 64);
      table.timestamps(true, true);
    }),
    knex.schema.createTable('question', (table) => {
      table.increments('id').primary();
      table.string('question_text').notNullable();
      table.integer('quiz_id').unsigned();
      table.foreign('quiz_id').references('quiz.id');
      table.string('subject', 64);
      table.enum('question_type', ['true/false', 'multiple choice', 'multiple choice-multiple answer', 'matching', 'short answer', 'essay']);
      table.integer('difficulty').unsigned();
      table.timestamps(true, true);
    }),
    knex.schema.createTable('answer', (table) => {
      table.increments('id').primary();
      table.string('answer_text').notNullable();
      table.integer('question_id').unsigned();
      table.foreign('question_id').references('question.id');
      table.integer('points').unsigned().defaultTo(0);
      table.boolean('correct').defaultTo(false);
      table.timestamps(true, true);
    }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('answer'),
    knex.schema.dropTable('question'),
    knex.schema.dropTable('quiz'),
    knex.schema.dropTable('folder'),
    knex.schema.dropTable('user'),
  ]);
};
