"use strict";

const express = require('express');
const router = express.Router();
const sendMailController = require('../controllers/sendMailController');

// Ruta para enviar el correo electrónico
router.post('/', sendMailController.sendEmail);

module.exports = router;