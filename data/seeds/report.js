/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('report').truncate()
  await knex('report').insert([
    {user_id: 1, station_id: 478, incident: 'Police Spotted', more_details: 'Two undercover cops at the NE entrance', confirm: 'false'},
    {user_id: 2, station_id: 479, incident: 'Police Spotted', more_details: 'Watchout for cops at hidding', confirm: 'false'},
    {user_id: 3, station_id: 480, incident: 'Undercover cops spotted', more_details: '', confirm: 'false'},
    {user_id: 4, station_id: 476, incident: 'Police Spotted', more_details: 'Two undercover cops at the SW entrance', confirm: 'false'},
    {user_id: 5, station_id: 474, incident: 'Undercover cops spotted', more_details: 'Watchout for cops at hidding', confirm: 'false'}
  ]);
};
