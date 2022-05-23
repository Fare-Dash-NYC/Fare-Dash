const router = require('express').Router();
const controller = require("../controllers/Users.js");
const authCheck = require("../middleware/checkAuth.js");

router.post('/', controller.fetchStations)
// router.get('/users', controller.getAllUsers)
router.post('/reports', controller.makeReport)
router.post('/register', controller.createUser)
router.post('/login', controller.loginUser)
router.get('/is-verify', authCheck, controller.verifyToken)


module.exports = router;