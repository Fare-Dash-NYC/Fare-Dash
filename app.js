const express = require('express');
const app = express();
//const { pool } = require('./db.js');
const userRouter = require('./routes/users');
const cors = require("cors");


const PORT = process.env.port || 8080;

//middleware
app.use(express.urlencoded());
app.use(express.json());
app.use(cors())

//routers
app.use("/users", userRouter.js);
app.get('/', async (req, res) => {
    console.log("You are here, headers:", req.headers);
});


app.listen(PORT, ()=>{
    console.log('app started ')
})

//pool.query("INSERT INTO users (username) values($1)", [data.username])0