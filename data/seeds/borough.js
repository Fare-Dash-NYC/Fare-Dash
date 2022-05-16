/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('borough').del()
  await knex('borough').insert([
    {borough_id: 1, borough_name: 'Manhattan', station_id: 0},
    {borough_id: 2, borough_name: 'The Bronx', station_id: 0},
    {borough_id: 3, borough_name: 'Brooklyn', station_id: 0},
    {borough_id: 4, borough_name: 'Queens', station_id: 0},
    {borough_id: 5, borough_name: 'Staten Island', station_id: 0}
  ]);
};
