const express = require("express");
const router = require('express').Router();
// const userRouter = require('../controllers/Users.js')

const getAllUsers = require("../controllers/Users.js")

router.get('/users', getAllUsers)

module.exports = router;