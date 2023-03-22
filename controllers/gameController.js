"use strict";

const gameModel = require("../models/gameModel");

module.exports = {
    allUsersName: async function (req, res, next) {
        try {
            const allNames = await gameModel.findAll({
                attributes: ['usersName']
            });
            res.json(allNames);
        } catch (err) {
            console.log(err);
        }
    },

    AllGamePoints: async function (req, res, next) {
        try {
            const allGamePoints = await gameModel.findAll({
                attributes: ['gamePoints']
            });
            res.json(allGamePoints);
        } catch (err) {
            console.log(err);
        }
    },

    allTimesPlayed: async function (req, res, next) {
        try {
            const allTimesPlayed = await gameModel.findAll({
                attributes: ['timesPlayed']
            });
            res.json(allTimesPlayed);
        } catch (err) {
            console.log(err);
        }
    }
};