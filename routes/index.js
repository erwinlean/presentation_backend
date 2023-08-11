"use strict";

var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController");
const getToken = require("../middleware/createToken");

router.get('/', indexController.index);

router.post('/token', getToken, (req,res) => {
    res.json({ token: req.token });
});

module.exports = router;