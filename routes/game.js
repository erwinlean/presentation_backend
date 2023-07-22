"use strict"

var express = require('express');
var router = express.Router(); 
const gameController = require("../controllers/gameController");
const authenticateToken = require("../middleware/verifyToken");

// Single game response
router.get('/', authenticateToken, gameController.allData)
// Rest of responses
router.get('/users', authenticateToken, gameController.allUsers);
router.get('/points',authenticateToken, gameController.allPoints);
router.get('/timesplayed',authenticateToken, gameController.allTimesPlayed);
// Add data
router.post('/add',authenticateToken,  gameController.addNewData);
// Delete data
router.delete("/deleteUser",authenticateToken, gameController.deleteUser);
router.delete("/deleteAll", authenticateToken, gameController.deleteAllData);

module.exports = router; 