/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Inserts users
  await knex('users').truncate()
  await knex('users').insert([
      {user_id: 1, first_name: 'Charles', last_name: 'Yarney', email: 'charyar@email.com', password: 'ddd', display_name: 'charyar'},
      {user_id: 2, first_name: 'Jan', last_name: 'Morales', email: 'JMorales@email.com', password: 'eerd', display_name: 'JMorales'},
      {user_id: 3, first_name: 'Khalia', last_name: 'Jones', email: 'Kjones@email.com', password: 'oddd', display_name: 'Kjones'},
      {user_id: 4, first_name: 'Anncie', last_name: 'Baptise', email: 'Abaptise@email.com', password: 'dyy', display_name: 'Abaptis'}
    ]);
  };
