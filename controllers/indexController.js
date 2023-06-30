"use strict";

module.exports = {
    index: async function (req, res) {
        try {
            res.status(417).json({ message: "Page not found, the correct path for this api are: /game, /game/users, etc. Please check doc at: https://github.com/erwinlean/presentation_api" });
        } catch (err) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};