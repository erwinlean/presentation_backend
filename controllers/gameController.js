"use strict";

const Game = require("../models/gameModel");
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

module.exports = {
    allData: async function (req, res) {
        try {
            const allNames = await Game.find({}, "usersName");
            const allGamePoints = await Game.find({}, "gamePoints");
            const allTimesPlayed = await Game.countDocuments();

            const responseData = {
                allNames: allNames,
                allGamePoints: allGamePoints,
                allTimesPlayed: allTimesPlayed,
            };

            const organizedData = responseData.allNames.map((name, index) => {
                return [name, responseData.allGamePoints[index], responseData.allTimesPlayed];
            });

            res.json(organizedData);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },

    allUsers: async function (req, res) {
        try {
            const allNames = await Game.find({}, "usersName");
            res.json(allNames);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        };
    },

    allPoints: async function (req, res) {
        try {
            const allGamePoints = await Game.find({}, "gamePoints");
            res.json(allGamePoints);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        };
    },

    allTimesPlayed: async function (req, res) {
        try {
            const allTimesPlayed = await Game.countDocuments();
            res.json(allTimesPlayed);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        };
    },

    addNewData: async function (req, res) {
        const { usersName, gamePoints, timesPlayed } = req.body;
    
        if (!usersName || !gamePoints || !timesPlayed) {
            return res.status(400).json({ message: 'User name, game points, and times played are required' });
        };
    
        const DOMPurify = createDOMPurify(new JSDOM().window);
        const sanitizedUsersName = DOMPurify.sanitize(usersName);
        const sanitizedGamePoints = DOMPurify.sanitize(gamePoints);
        const sanitizedTimesPlayed = DOMPurify.sanitize(timesPlayed);
    
        try {
            const newGameData = new Game({ usersName: sanitizedUsersName, gamePoints: sanitizedGamePoints, timesPlayed: sanitizedTimesPlayed });
            await newGameData.save();
    
            res.status(201).json({ message: "Game data added successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        };
    },

    deleteUser: async function (req, res) {
        const { userName } = req.params;

        try {
            const deletedUser = await Game.deleteOne({ usersName: userName });

            if (deletedUser.deletedCount > 0) {
                res.json({ message: "User deleted successfully" });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        };
    },

    deleteAllData: async function (req, res) {
        try {
            await Game.deleteMany({});
            res.json({ message: "All data deleted successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        };
    }
};