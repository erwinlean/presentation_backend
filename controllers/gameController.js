"use strict";

const gameModel = require("../models/gameModel");

module.exports = {
    allUsersName: async function (req, res, next) {
        try {
            const allNames = await gameModel.findAll({
                attributes: ["usersName"],
            });
            res.json(allNames);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    AllGamePoints: async function (req, res, next) {
        try {
            const allGamePoints = await gameModel.findAll({
                attributes: ["gamePoints"],
            });
            res.json(allGamePoints);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    allTimesPlayed: async function (req, res, next) {
        try {
            const allTimesPlayed = await gameModel.findAll({
            attributes: ["timesPlayed"],
        });
        res.json(allTimesPlayed);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // POST game data
    addGameData: async function (req, res, next) {
        const { usersName, gamePoints, timesPlayed } = req.body;

        try {
            const newGameData = await gameModel.create({
            usersName,
            gamePoints,
            timesPlayed,
        });
        res.status(201).json({ message: "Game data added successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    // DELETE game data by ID
    // Not necesary for now
    /*
    removeGameData: async function (req, res, next) {
    const { name } = req.params;

    try {
        const gameData = await gameModel.findOne({ where: { userName: name } });
        if (!gameData) {
            res.status(404).json({ message: "Game data not found" });
            return;
        }
        await gameData.destroy();
        res.json({ message: "Game data removed successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    */
};