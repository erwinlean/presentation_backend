"use strict";

const jwt = require('jsonwebtoken');

const secretKey = '37058003';

const getToken = (req, res, next) => {
    
    //const allowedURL = 'http://127.0.0.1:5500'
    const allowedURL = 'https://erwin-marte.netlify.app'

    const origin = req.headers.origin;
    console.log(origin);

    if (origin == allowedURL) {
        const token = jwt.sign({}, secretKey, { expiresIn: '2h' });
        req.token = token;
        next();
    } else {
        res.status(403).json({ message: 'Unauthorized access'});
    }
};

module.exports = getToken;