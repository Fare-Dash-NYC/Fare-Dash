const { Pool } = require('pg');


const connectionDevelopment = {
    database: 'fare_dash',
    user: 'postgres',
    password: '',
    host: 'localhost',
    port: 8080
  }
  
  const connectionProduction = {
    connectionString: process.env.DATABASE_URL, 
    ssl: {rejectUnauthorized: false}
  }
  
  const pool = new Pool(process.env.NODE_ENV === 'production' ? connectionProduction : connectionDevelopment)

  module.exports = {
      pool
  }