'use strict';

module.exports = (sequelize,type) => {
    const game = sequelize.define("game",{
        usersName: type.STRING,
        gamePoints: type.INTEGER,
        timesPlayed: type.INTEGER
    });

    return game;
};