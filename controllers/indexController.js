"use strict";

const {endpointResponseTime, endpointCounter} = require("../metrics/metrics.js");

module.exports = {
    index: async function (req, res, next) {
        try {
            const end = endpointResponseTime.startTimer();
            endpointCounter.inc();
            res.status(417).json({ message: "Page not found, the correct path for this api are: /game, /game/users, etc. Please check doc at: https://github.com/erwinlean/presentation_api" });
            end();
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error" });
        };
    }
};