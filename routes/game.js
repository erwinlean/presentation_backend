"use strict"

var express = require('express');
var router = express.Router(); 
const gameModel = require("../controllers/gameController");

// Single game response
router.get('/', function(req, res, next) {
    res.render('index', { 
        title: 'On game routes > routes are: /users, /points, /timesPlayed & /add'
    });
});

// Rest of responses
router.get('/users', async (req, res) => {
    try {
        const allNames = await gameModel.findAll({
            attributes: ["usersName"],
        });
        res.json(allNames);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/points', async (req, res) => {
    try {
        const allGamePoints = await gameModel.findAll({
            attributes: ["gamePoints"],
        });
        res.json(allGamePoints);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get('/timesplayed', async (req, res) => {
    try {
        const allTimesPlayed = await gameModel.findAll({
        attributes: ["timesPlayed"],
    });
    res.json(allTimesPlayed);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/add', async (req, res) => {
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
});

module.exports = router; 