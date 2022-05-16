require("dotenv").config();
const db = require("../db");
const bcrypt = require("bcrypt");
const {generateToken} = require ('../middleware/user-auth');

//get all useres from database
async function getAllUsers(req, res) {
  try {
    const user = await db.any("SELECT * FROM users");
    return res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

// //get user by location
// async function locateUser(req, res) {
  
//   try {
//     const users = await db.any(
//       "SELECT * FROM users WHERE street_address=${street_address} AND city=${city} AND state=${state} AND zip=${zip}",
//       req.body
//     );
//     return res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// }

//get user by name
async function getUserByName(req, res) {
  const query = req.params.query
  console.log("query: ", query)
  try {
    console.log("inside try")
    const results = await db.any(
      `SELECT * FROM users WHERE lower(display_name) LIKE '%${query.toLowerCase()}%';`
    );
    console.log("results: ", results);
    return res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err.message);
  }
}

//get a single user from table matching id
async function getAUser(req, res) {
  const id = parseInt(res["user_id"], 10);
  try {
    const user = await db.one("SELECT * FROM users where id = $1", id);
    return res.json(user);
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
}

async function getUserInfo(req, res) {
  const userID = req.body["user_id"] ? parseInt(req.body["user_id"], 10) : parseInt(req.params["user_id"]);

  try {
    const user = await db.one("SELECT * FROM users where id = $1", userID);
    return res.json(user);
    
  } catch (err) {
    return res.status(500).json({message: err.message})
  }
}

//create one user and add to table
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

//login user
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
async function updateUser(req, res) {

  function parseBody(req) {
    const changes = Object.entries(req.body);
    console.log(`changes ${changes}`)

    let query = 'UPDATE users SET';

    changes.forEach(([key, value], idx) => {
        if (changes.length > 1 && idx!==changes.length-1) {
            query += ` ${key}='${value}',`
        } else {
            query += ` ${key}='${value}'`
        }
    })

    query += ` WHERE id=${parseInt(res["user_id"], 10)} RETURNING *;`

    console.log(`query: ${query}`)

    return query
  }

  try {
    await db.one(parseBody(req))
    return res.status(202).json({
      message: "success"
    });
  } catch (err){
    return res.status(500).json({
      message: err.message
    });
  }

}

// // grabs users by a type
// // /user/category/:type
// async function userByType (req, res) {
//   const type = req.params.type
//   try {
//     const users = await db.any(
//       "SELECT * FROM users WHERE user_type=$1", type
//     )
//     res.status(200).json(users)
//   } catch (err) {
//     return res.status(404).send(err.message)
//   }
// }

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

module.exports = {
  getAllUsers,
//   locateUser,
  getUserByName,
  getAUser,
  getUserInfo,
  createUser,
  loginUser,
  updateUser,
//   userByType,
  deleteUser,
};0