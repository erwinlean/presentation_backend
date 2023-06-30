'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

const dbUser = process.env.DBuser;
const dbPassword = process.env.DBpasswordAuth;
const dbHost = process.env.DBhost;
const dbName = process.env.DBname;

const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conectado a la base de datos MongoDB");
}).catch((err) => {
    console.log("No Conectado, error en base de datos", err);
});

module.exports = mongoose;