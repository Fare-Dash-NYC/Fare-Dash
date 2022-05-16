/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Inserts users
  return knex('users').truncate()
  .then(function () {
    return knex('users').insert([
      {user_id: 1, first_name: 'Charles', last_name: 'Yarney', email: 'charyar@email.com', password: 'ddd', display_name: 'charyar'},
      {user_id: 1, first_name: 'Jan', last_name: 'Morales', email: 'JMorales@email.com', password: 'eerd', display_name: 'JMorales'},
      {user_id: 1, first_name: 'Khalia', last_name: '', email: 'charyar@email.com', password: 'ddd', display_name: 'charyar'},
      {user_id: 1, first_name: 'Charles', last_name: 'Yarney', email: 'charyar@email.com', password: 'ddd', display_name: 'charyar'}
    ]);
  });
};
