/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('borough').del()
  await knex('borough').insert([
    {borough_name: 'Manhattan', station_id: 0},
    {borough_name: 'The Bronx', station_id: 0},
    {borough_name: 'Brooklyn', station_id: 0},
    {borough_name: 'Queens', station_id: 0},
    {borough_name: 'Staten Island', station_id: 0}
  ]);
};
