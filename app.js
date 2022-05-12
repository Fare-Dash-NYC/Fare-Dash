const express = require('express')
const app = express();
const { pool } = require('./db.js');


const PORT = process.env.port || 8080;
app.use(express.json());

//pool.query("INSERT INTO users (username) values($1)", [data.username])

app.listen(PORT)

// install dependencies in the new forked repo and copy/paste my current progress