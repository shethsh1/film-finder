const bcrypt = require('bcrypt');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(async function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'john_doe',
          email: 'john_doe@example.com',
          password: await bcrypt.hash('password', 10),
        },
        {
          username: 'jane_doe',
          email: 'jane_doe@example.com',
          password: await bcrypt.hash('password', 10),
        },
        {
          username: 'bob_smith',
          email: 'bob_smith@example.com',
          password: await bcrypt.hash('password', 10),
        },
        {
          username: 'alice_smith',
          email: 'alice_smith@example.com',
          password: await bcrypt.hash('password', 10),
        },
        {
          username: 'jim_jones',
          email: 'jim_jones@example.com',
          password: await bcrypt.hash('password', 10),
        },
      ]);
    });
};
