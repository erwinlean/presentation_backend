"use strict";

require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const Contact = require('../models/contactModel');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    sendEmail: async function (req, res) {
        const { email, nombre, mensaje } = req.body;

        try {
            const contact = new Contact({ email, nombre, mensaje });
            await contact.save();

            const msg = {
                to: process.env.MAIL_TO,
                from: process.env.MAIL_FROM,
                subject: 'Mensaje de contacto',
                text: `Nombre: ${nombre}\n${email} \nMensaje: ${mensaje}`,
            };

            await sgMail.send(msg);

            res.status(200).json({ message: 'Correo electrónico enviado exitosamente' });
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
            res.status(500).json({ message: 'Error al enviar el correo electrónico' });
        }
    },

    getMails: async function (req, res) {
        try {
            const contacts = await Contact.find();

            res.json(contacts);
        } catch (error) {
            console.error('Error al obtener los contactos:', error);

            res.status(500).json({ message: 'Error al obtener los contactos' });
        }
    }
};