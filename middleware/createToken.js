"use strict";

const jwt = require('jsonwebtoken');

const secretKey = '37058003';

const getToken = (req, res, next) => {
    const allowedURLs = [
        'https://test-porfolio.netlify.app/',
        'https://test-porfolio.netlify.app/index.html',
        'https://test-porfolio.netlify.app/game.html',
        'https://test-porfolio.netlify.app/contact.html'
    ];

    const origin = req.headers.origin;

    if (allowedURLs.includes(origin)) {
        const token = jwt.sign({}, secretKey, { expiresIn: '2h' });
        req.token = token;
        next();
    } else {
        res.status(403).json({ message: 'Unauthorized access'});
    }
};

module.exports = getToken;