const {query} = require("../db");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils");
const authCheck = require("../middleware/checkAuth");
//populate stations table

const saltRounds = 10;
let populated = false;

async function fetchStations(){
  if(!populated){
    const response = await fetch("https://data.cityofnewyork.us/resource/kk4q-3rt2.json");
    const stations = await response.json();
  
    const sql =
    "insert into station ( station_name, long, lat, line) values ($1, $2, $3, $4)";
  
    stations.forEach(station => {
      const {name, the_geom, line} = station
      const data = query(sql, [name, the_geom.coordinates[0], the_geom.coordinates[1], line])
    }) 
    
    let populated = true
  }
  return;
}

//get all users from database
async function getAllUsers(req, res) {
  const user = await query("SELECT * FROM users");
    try {
      return res.status(201).json(user);
    } catch (err) {
      res.status(500).send(err);
    }
  }


  //get user by display_name


//get a single user from table matching id
async function getAUser(req, res) {
  const id = req.params.id
  console.log(id)
  try {
    const user = await query("SELECT * FROM users where id = $1", [id]);
    console.log(user)
    return res.json(user);
  } catch (err) {
    console.log(err)
    return res.status(500).send(err);
  }
} 
  //create user
async function createUser(req, res) {
  
    const {firstName, lastName, email, password, displayName} = req.body;
    

    try {

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const sql = "INSERT INTO users ( first_name, last_name, email, password, display_name) VALUES ($1, $2, $3, $4, $5)"
      const user = await query(sql, [firstName, lastName, email, hashedPassword, displayName])
      const token = await generateToken(user.user_id);

      console.log(user)
      
      return res.status(201).json({
        user,
        token
      });
  
    } catch (err) {
      console.log(err.message);
    res.status(500).json({
      message: err.message,
    });
    }
    
    // return res.status(201).json({token})
        
  }

  //loginUser 
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await (
      await query("select * from users where email = $1", [email])
    ).rows[0];

    if (!user) {
      return res.status(401).json({
        message: "You sure you have the right email?",
      });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if (!passwordCorrect) {
      return res.status(401).json({
        message: "You sure you have the right password?",
      });
    }

    const token = await generateToken(user.user_id);
    // console.log(user)
    return res.status(200).json({
        user,
        token
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//update single user from database

//delete a user from database
async function deleteUser(req, res) {

    const id = parseInt(res["user_id"], 10);
  
    try {
      await db.none("DELETE FROM users WHERE id=$1", id);
      return res.json({
        message: "success",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

//get user by location
async function locateUser(req, res) {
  
  try {
    const users = await db.any(
      "SELECT * FROM users WHERE street_address=${street_address} AND city=${city} AND state=${state} AND zip=${zip}",
      req.body
    );
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

async function makeReport(req, res) {
  const { station, reportType, details} = req.body  
  const sql =
  "insert into report (station_name, incident, more_details) values ($1, $2, $3) returning *";

const report = (await query(sql, [station, reportType, details]))
console.log(report)
  try {
    
    return res.status(201).json({
      report
    })

    } catch (error) { 
      res.status(500).json({
        message: error.message,
      });
    }
  }

async function verifyToken(req, res) {
  try {
    res.json(true)
  } catch (err) {
    res.status(500).json({
      message: error.message,
    });
  }
}

  module.exports = {
    getAllUsers,
    fetchStations,
    makeReport,
    getAUser,
    createUser,
    loginUser,
    deleteUser,
    locateUser,
    verifyToken
  };