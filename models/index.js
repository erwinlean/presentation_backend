"use strict";

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
require('dotenv').config();

const db = {};

const dbUser = process.env.DBuser;
const dbPassword = process.env.DBpasswordAuth;
const dbHost = process.env.DBhost;
const dbName = process.env.DBname;

const dbConfig = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
    user: dbUser,
    password: dbPassword
    }
};
console.log(dbConfig);
const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(connectionString, dbConfig);

fs
.readdirSync(__dirname)
.filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
.forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.modelName] = model;
});

module.exports = db;