"use strict";

var express = require('express');
var router = express.Router();
const chatController = require("../controllers/chatController");

// Save msg to the DB
router.get('/', chatController.getAllChat);
router.post('/', chatController.addNewChat);

module.exports = router;