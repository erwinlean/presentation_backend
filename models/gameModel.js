"use strict";

const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    usersName: {
        type: String,
        required: true
    },
    gamePoints: {
        type: Number,
        required: true
    },
    timesPlayed: {
        type: Number,
        required: true
    }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;