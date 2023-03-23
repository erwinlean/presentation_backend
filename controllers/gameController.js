"use strict"

const gameModel = require("../models/gameModel");
const { endpointResponseTime, endpointCounter } = require("../metrics/metrics.js");

// Single game response
module.exports = {
    allData: async function (req, res, next) {
        try {
            const end = endpointResponseTime.startTimer();
            endpointCounter.inc();

            const allNames = await gameModel.findAll({
                attributes: ["usersName"],
            });
            const allGamePoints = await gameModel.findAll({
                attributes: ["gamePoints"],
            });
            const allTimesPlayed = await gameModel.findAll({
                attributes: ["timesPlayed"],
            });
    
            const responseData = {
                allNames: allNames,
                allGamePoints: allGamePoints,
                allTimesPlayed: allTimesPlayed.length,
            };

            // Re organize db data
            const organizedData = [];
            for (let i = 0; i < responseData.allNames.length; i++) {
                const userData = [
                    responseData.allNames[i].usersName,
                    responseData.allGamePoints[i].gamePoints,
                    responseData.allTimesPlayed,
                ];
                organizedData.push(userData);
            };

            res.json(organizedData);

            end();
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        };
    },
    allUsers: async function (req, res, next) {
        try {
            const end = endpointResponseTime.startTimer();
            endpointCounter.inc();

            const allNames = await gameModel.findAll({
                attributes: ["usersName"],
            });
            res.json(allNames);

            end();
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        };
    },
    allPoints: async function (req, res, next) {
        try {
            const end = endpointResponseTime.startTimer();
            endpointCounter.inc();

            const allGamePoints = await gameModel.findAll({
                attributes: ["gamePoints"],
            });
            res.json(allGamePoints);

            end();
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        };
    },
    allTimesPlayed: async function (req, res, next) {
        try {
            const end = endpointResponseTime.startTimer();
            endpointCounter.inc();

            const allTimesPlayed = await gameModel.findAll({
                attributes: ["timesPlayed"],
            });
            res.json(allTimesPlayed.length);

            end();
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        };
    },
    addNewData: async function (req, res, next) {
        const { usersName, gamePoints, timesPlayed } = req.body;

        try {
            const end = endpointResponseTime.startTimer();
            endpointCounter.inc();

            const newGameData = await gameModel.create({
                usersName,
                gamePoints,
                timesPlayed,
            });
            res.status(201).json({ message: "Game data added successfully" });

            end();
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        };
    },
    deleteUser: async function (req, res, next) {
        const { userName } = req.params;

        try {
            const end = endpointResponseTime.startTimer();
            endpointCounter.inc();

            const deletedUser = await gameModel.destroy({
                where: {
                    usersName: userName
                }
            });
            if (deletedUser) {
                res.json({ message: "User deleted successfully" });
            } else {
                res.status(404).json({ message: "User not found" });
            }

            end();
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    /*
    deleteAllData: async function (req, res, next) {
        try {
            const deletedRows = await gameModel.destroy({
                where: {},
                truncate: true
            });
            res.json({ message: "All data deleted successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }*/
};