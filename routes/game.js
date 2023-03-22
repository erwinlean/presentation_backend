"use strict"

var express = require('express');
var router = express.Router(); 
const gameController = require("../controllers/gameController");

// Single game response
router.get('/', gameController.allData)
// Rest of responses
router.get('/users', gameController.allUsers);
router.get('/points', gameController.allPoints);
router.get('/timesplayed', gameController.allTimesPlayed);
// Add data
router.post('/add', gameController.addNewData);
// Delete data
router.delete("/deleteUser", gameController.deleteUser);
/*router.delete("/deleteAll", gameController.deleteAllData);*/

module.exports = router; 