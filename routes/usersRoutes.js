const express = require("express");
const router = require('express').Router();
const controller = require("../controllers/Users.js")

router.get('/users', controller.getAllUsers)

router.post('/reports', controller.makeReport)

module.exports = router;