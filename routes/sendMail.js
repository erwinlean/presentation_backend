"use strict";

const express = require('express');
const router = express.Router();
const sendMailController = require('../controllers/sendMailController');
const authenticateToken = require("../middleware/verifyToken");

// Ruta para enviar el correo electrónico
router.post('/',authenticateToken, sendMailController.sendEmail);
router.get('/', authenticateToken, sendMailController.getMails);
router.delete('/delete',authenticateToken, sendMailController.deleteAllContacts);

module.exports = router;