/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('report').truncate()
  await knex('report').insert([
    {report_id: 1, user_id: 2, station_id: 13, incident: 'Police Spotted', more_details: 'Two undercover cops at the NE entrance', confirm: 'false'},
    {report_id: 2, user_id: 6, station_id: 8, incident: 'Police Spotted', more_details: 'Watchout for cops at hidding', confirm: 'false'},
    {report_id: 3, user_id: 3, station_id: 15, incident: 'Undercover cops spotted', more_details: '', confirm: 'false'},
    {report_id: 4, user_id: 4, station_id: 6, incident: 'Police Spotted', more_details: 'Two undercover cops at the SW entrance', confirm: 'false'},
    {report_id: 5, user_id: 13, station_id: 9, incident: 'Undercover cops spotted', more_details: 'Watchout for cops at hidding', confirm: 'false'}
  ]);
};
