const router = require("express").Router();
const authCheck = require("../middleware/checkAuth")
const {query} = require("../db");



router.get("/", authCheck, async (req, res) => {
  try {
    const user = await query(
      "SELECT user_id FROM users WHERE user_id = $1",
      [req.userId] 
    ); 
    
  //if would be req.user if you change your payload to this:
    
  //   function jwtGenerator(user_id) {
  //   const payload = {
  //     user: user_id
  //   };
    
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;