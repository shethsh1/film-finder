exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'john_doe',
          email: 'john_doe@example.com',
          password: 'password1',
        },
        {
          username: 'jane_doe',
          email: 'jane_doe@example.com',
          password: 'password2',
        },
        {
          username: 'bob_smith',
          email: 'bob_smith@example.com',
          password: 'password3',
        },
        {
          username: 'alice_smith',
          email: 'alice_smith@example.com',
          password: 'password4',
        },
        {
          username: 'jim_jones',
          email: 'jim_jones@example.com',
          password: 'password5',
        },
      ]);
    });
};
