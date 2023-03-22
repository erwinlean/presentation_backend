"use strict"

var express = require('express');
var router = express.Router(); 
const gameController = require("../controllers/gameController");

router.get("/users", gameController.allUsersName); 
router.get("/points", gameController.AllGamePoints); 
router.get("/times", gameController.allTimesPlayed); 

module.exports = router; 