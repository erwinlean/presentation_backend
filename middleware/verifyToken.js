"use strict";

const jwt = require('jsonwebtoken');
const secretKey = '37058003';

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de acceso no válido' });
    };

    const accessToken = token.split(' ')[1];
    try {
        const decoded = jwt.verify(accessToken, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token de acceso inválido' });
    };
};

module.exports = authenticateToken;