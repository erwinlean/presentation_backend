'use strict';

const db = require("./dbData.json");
const Sequelize = require ("sequelize");
const gameModel = require ("../models/gameModel");

// DB initalization
const sequelize = new Sequelize(db.information.name, db.information.user, db.information.password,{
    host: db.information.host,
    dialect: db.information.dialect,
    port: db.information.port
});


// Model
const GameModel = gameModel(sequelize, Sequelize);

/*
/**/
// Syncronized model with db
sequelize.sync({force: false})
    .then(() => {
        console.log("dataBase working, ok.");
    }
);
/**/
/**/
/*
// Sync the models with the database
sequelize.sync({force: true}).then(() => {
    console.log("Database tables created");
});
*/
/**/


module.exports = {
    GameModel,
    sequelize
};