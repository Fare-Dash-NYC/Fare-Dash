const express = require('express')
const faresRouter = reqiure('./routes/dogRouer')
const app = express();
const { pool } = require('./db.js');
const userRouter = require('./routes/usersRouter')


const PORT = process.env.port || 8080;
app.use(express.json());
app.use(cors())
app.use(userRouter)

//pool.query("INSERT INTO users (username) values($1)", [data.username])

app.listen(PORT, ()=>{
    console.log('app started ')
})