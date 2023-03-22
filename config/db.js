'use strict';

const db = require("./dbData.json");
const Sequelize = require ("sequelize");
const gameModel = require ("../models/gameModel");

function initializeDb() {
    // db data
    const sequelize = new Sequelize(db.information.name, db.information.user, db.information.password,{
        host: db.information.host,
        dialect: db.information.dialect,
        port: db.information.port
    });

    // Model with Sequelize
    const GameModel = gameModel(sequelize, Sequelize);

    // Syncronized model with db
    sequelize.sync({force: false})
        .then(() => {
            console.log("dataBase working, ok.");
        });

    return {
        GameModel,
        sequelize
    };
}

module.exports = initializeDb;