/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("report", (table) => {
        table.increments("report_id");
        table.integer("user_id").notNullable()
        table.integer("station_id").notNullable();
        table.string("incident").notNullable();
        table.timestamp("time").defaultTo(knex.fn.now());
        table.string("more_details");
        table.boolean("confirm");
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("report");
};
