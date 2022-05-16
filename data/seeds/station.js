/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries'42nd Grand Central'
  await knex('station').del()
  await knex('station').insert([
    {station_id: 1, station_name: '42nd Grand Central', location: 'New York', borough_id:3},
    {station_id: 2, station_name: '34th Street Herald Square', location: 'New York', borough_id:3},
    {station_id: 3, station_name: '14th street union square', location: 'New York', borough_id:5},
    {station_id: 4, station_name: 'Atlantic Av-Barclays', location: 'New York', borough_id:2},
    {station_id: 5, station_name: '42nd Grand Central', location: 'New York', borough_id:3},
    {station_id: 6, station_name: 'York Street', location: 'New York', borough_id:4},
    {station_id: 7, station_name: 'DeKalb Avenue', location: 'New York', borough_id:3},
    {station_id: 8, station_name: '34th Street Herald Square', location: 'New York', borough_id:1},
    {station_id: 9, station_name: 'Bedford Avenue', location: 'New York', borough_id:5},
    {station_id: 10, station_name: '42nd Grand Central', location: 'New York', borough_id:3},
    {station_id: 11, station_name: 'Atlantic Av-Barclays', location: 'New York', borough_id:1},
    {station_id: 12, station_name: 'Canal Street', location: 'New York', borough_id:4}
  ]);
};
