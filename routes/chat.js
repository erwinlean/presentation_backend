"use strict";

var express = require('express');
var router = express.Router();
const chatController = require("../controllers/chatController");
const authenticateToken = require("../middleware/verifyToken");

// Save msg to the DB
router.get('/', authenticateToken ,chatController.getAllChat);
router.post('/',authenticateToken , chatController.addNewChat);
router.delete('/delete', authenticateToken, chatController.deleteAllChats);


module.exports = router;