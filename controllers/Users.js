const {query} = require("../db");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
let populated = false;
//populate stations table



async function fetchStations(){
  if(!populated){
    const response = await fetch("https://data.cityofnewyork.us/resource/kk4q-3rt2.json");
    const stations = await response.json();
    //
  
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
  
    let user = req.body;
    let hashedPassword;
    const saltRounds = 10;
    console.log('create a user: ', user)
    
    // validate user account info (needs work)
    if (!user) {
      return res.status(400).json({
        message: "Invalid account info"
      })
    }
  
    try {
      hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user["password"] = hashedPassword;
    } catch (err) {
      return res.status(401).json({
        message: "Invalid password",
        error: err.message
      })
    }
  
    let token;
    
    try {
      await db.none(
        "INSERT INTO users (display_name, first_name, last_name, display_name, email, password) VALUES (${display_name}, ${first_name}, ${last_name}, ${display_name}, ${email}, ${password})",
        user
      );
  
      const userID = await db.one("SELECT id,  FROM users WHERE display_name=${display_name}", user)
        
      console.log("userID ", userID)
        
      token = await generateToken(userID)
      
      // return res.status(201).json({
        //   message: "user account registered"
      // })
  
    } catch (err) {
      console.log(`ERR CAUGHT: ${err.message}`)
      return res.status(400).send(err);
    }
    
    return res.status(201).json({token})
        
  }

  //loginUser 
async function loginUser(req, res) {
    const { password } = req.body
  
    const {exists} = await db.one('SELECT EXISTS(SELECT * FROM users WHERE display_name=${display_name})', req.body)
  
    let user;
  
    if (!exists) {
      return res.status(404).json({
        message: "No user found with that user name"
      })
    } else {
      user = await db.one('SELECT * FROM users WHERE display_name=${display_name}', req.body)
      console.log(user)
    }
  
    let match;
  
    try {
      match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(401).json({
          message: "Invalid Credentials", 
        })
      } else {
  
        const token = await generateToken(user);
  
        return res.status(202).json({"token": token})
      }
  
    } catch (err) {
      return res.status(400).json(err.message)
    }
  }

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
  const { user_id, station_id, incident, more_details, confirm} = req.body
  const sql =
  "insert into report (user_id, station_id, incident, more_details, confirm) values ($1, $2, $3, $4, $5) returning *";

const report = (await query(sql, [user_id, station_id, incident, more_details, confirm]))
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

  module.exports = {
    getAllUsers,
    fetchStations,
    makeReport,
    getAUser,
    createUser,
    loginUser,
    deleteUser,
    locateUser,
  };