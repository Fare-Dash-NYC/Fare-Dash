/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Inserts users
  await knex('users').truncate()
  await knex('users').insert([
      {first_name: 'Charles', last_name: 'Yarney', email: 'charyar@email.com', password: 'ddd', display_name: 'charyar'},
      {first_name: 'Jan', last_name: 'Morales', email: 'JMorales@email.com', password: 'eerd', display_name: 'JMorales'},
      {first_name: 'Khalia', last_name: 'Jones', email: 'Kjones@email.com', password: 'oddd', display_name: 'Kjones'},
      {first_name: 'Anncie', last_name: 'Baptise', email: 'Abaptise@email.com', password: 'dyy', display_name: 'Abaptis'}
    ]);
  };
