const express = require("express");
const router = require('express').Router();
const controller = require("../controllers/Users.js")

router.post('/', controller.fetchStations)
// router.get('/users', controller.getAllUsers)
router.post('/reports', controller.makeReport)
router.post('/users', controller.createUser)



module.exports = router;