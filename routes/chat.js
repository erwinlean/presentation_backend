"use strict";

var express = require('express');
var router = express.Router();
const chatController = require("../controllers/chatController");
const { send_get_request } = require('../chatbot/opanai-chatbot');

router.get('/', chatController.getAllChat);
router.post('/', chatController.addNewChat);

router.post('/send-message', async function(req, res, next) {
    const { message } = req.body;

    const response = await send_get_request(context, message);  
    res.json({ response });
});

module.exports = router;