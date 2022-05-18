const express = require('express');
const app = express();
const userRouter = require('./routes/usersRoutes');
const cors = require("cors");
const {query} = require("./db")


const PORT = process.env.port || 8081;

//middleware
app.use(express.json());
app.use(cors())
app.use(userRouter);

app.get('/', async (req, res) => {
    try {
      const user = await query("SELECT * FROM users");
      return res.json(user.rows[0]);
    } catch (err) {
      res.status(500).send(err);
    }
  })

app.listen(PORT, ()=>{
    console.log('app started ')
})

//pool.query("INSERT INTO users (username) values($1)", [data.username])0