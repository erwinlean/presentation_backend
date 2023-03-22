'use strict';

const { Sequelize } = require('sequelize');

// Import database configuration
const { name, user, password, host, dialect, port } = require('./dbData.json').information;

// Initialize Sequelize with database connection details
const sequelize = new Sequelize(name, user, password, {
    host,
    dialect,
    port,
    logging: false
});

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection successful');
    })
    .catch((err) => {
        console.log('Database connection failed:', err);
    });

module.exports = sequelize;