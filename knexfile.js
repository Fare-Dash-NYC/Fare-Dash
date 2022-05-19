// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'fare_dash',
      user: 'postgres',
      password: ''
  },
  seeds: {
    directory: './data/seeds',
  }
},
production: {
  client: 'postgresql',
  connection: process.env.DATABASE_URL,
  
  migrations: {
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './seeds',
  },
}
};
