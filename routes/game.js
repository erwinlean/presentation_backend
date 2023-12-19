"use strict"

var express = require('express');
var router = express.Router(); 
const gameController = require("../controllers/gameController");
const authenticateToken = require("../middleware/verifyToken");
const {apiLimiter} = require("../middleware/security");

// Single game response
router.get('/', authenticateToken, gameController.allData)
// Rest of responses
router.get('/users', authenticateToken, gameController.allUsers);
router.get('/points',authenticateToken, gameController.allPoints);
router.get('/timesplayed',authenticateToken, gameController.allTimesPlayed);
// Add data
router.post('/add',authenticateToken,apiLimiter,  gameController.addNewData);
// Delete data
router.delete("/deleteUser",authenticateToken,apiLimiter, gameController.deleteUser);
router.delete("/deleteAll", authenticateToken,apiLimiter, gameController.deleteAllData);

module.exports = router; 