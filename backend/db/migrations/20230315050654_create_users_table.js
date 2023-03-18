exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary().unique();
    table.string('username', 50).unique();
    table.string('email').unique();
    table.text('password');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
