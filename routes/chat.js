"use strict";

var express = require('express');
var router = express.Router();
const chatController = require("../controllers/chatController");
const authenticateToken = require("../middleware/verifyToken");
const { apiLimiter } = require("../middleware/security");

// Save msg to the DB
router.get('/', authenticateToken, apiLimiter, chatController.getAllChat);
router.post('/', authenticateToken, apiLimiter, chatController.addNewChat);
router.delete('/delete', authenticateToken, apiLimiter, chatController.deleteAllChats);

module.exports = router;
