"use strict";

const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;