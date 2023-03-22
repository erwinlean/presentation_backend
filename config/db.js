'use strict';

const db = require("./dbData.json");
const Sequelize = require ("sequelize");
const gameModel = require ("../models/gameModel");

function initializeDb() {
    // db data
    const sequelize = new Sequelize(db.information.name, db.information.user, db.information.password,{
        host: db.information.host,
        dialect: db.information.dialect,
        port: db.information.port,
        dialectOptions: {
            connectTimeout: 60000 // 60 seconds
        },
        logging: false
    });

    // Model with Sequelize
    const GameModel = gameModel(sequelize, Sequelize);

    // Syncronized model with db
    sequelize.sync({force: false})
        .then(() => {
            console.log("dataBase working, ok.");
        })
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
            process.exit(1); // exit the process with a failure code
        });

    return {
        GameModel,
        sequelize
    };
}

module.exports = initializeDb;