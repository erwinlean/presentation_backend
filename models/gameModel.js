'use strict';

const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Game = sequelize.define('game', {
    usersName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gamePoints: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timesPlayed: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Game;