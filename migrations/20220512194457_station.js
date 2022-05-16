/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("station", (table) => {
        table.increments("station_id").notNullable();
        table.string("station_name").notNullable();
        // table.point("long").notNullable();
        // table.point("lat").notNullable();
        // table.point("location").notNullable();
        table.string("location").notNullable();
        table.string("borough_id").notNullable();
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