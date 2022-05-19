/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("station", (table) => {
        table.increments("station_id").notNullable();
        table.string("station_name").notNullable();
        table.string("long").notNullable();
        table.string("lat").notNullable();
        // table.point("location").notNullable();
        // table.string("location")
        table.string("line")
        // table.string("borough_id")
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("station")
};
0