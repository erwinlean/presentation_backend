"use strict";

const express = require('express');
const router = express.Router();
const sendMailController = require('../controllers/sendMailController');
const authenticateToken = require("../middleware/verifyToken");
const {apiLimiter} = require("../middleware/security");

// Ruta para enviar el correo electrónico
router.post('/',authenticateToken, apiLimiter, sendMailController.sendEmail);
router.get('/', authenticateToken, apiLimiter, sendMailController.getMails);
router.delete('/delete',authenticateToken, apiLimiter, sendMailController.deleteAllContacts);

module.exports = router;