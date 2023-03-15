exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.increments('id');
    table.string('username', 50).unique();
    table.string('email').unique();
    table.string('password', 36);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
