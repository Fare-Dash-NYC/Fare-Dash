/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("station", (table) => {
        table.increments("station_id").notNullable();
        table.string("long").notNullable();
        table.string("lang").notNullable();
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
