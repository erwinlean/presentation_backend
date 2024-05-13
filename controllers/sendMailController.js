"use strict";

require('dotenv').config();
const Contact = require('../models/contactModel');
const { contactEmail } = require("../utils/emailSender");
const { checkInputs } = require("../middleware/security");


module.exports = {
    sendEmail: async function (req, res) {
        const { email, nombre, mensaje } = req.body;
    
        if (!email || !nombre || !mensaje) {
            return res.status(400).json({ message: 'Email, name, and message are required' });
        };

        if(checkInputs(email) || checkInputs(nombre) || checkInputs(mensaje) ){
            return res.status(401).json({message: "Email data error, check input and try again."});
        };
        const sanitizedEmail = email;
        const sanitizedNombre = nombre;
        const sanitizedMensaje = mensaje;
    
        try {
            const contact = new Contact({ email: sanitizedEmail, nombre: sanitizedNombre, mensaje: sanitizedMensaje });
            await contact.save();

            contactEmail(sanitizedEmail, sanitizedNombre, sanitizedMensaje);
    
            res.status(200).json({ message: 'Correo electrónico enviado exitosamente' });
        } catch (error) {
            console.error('Error al enviar el correo electrónico:', error);
            res.status(500).json({ message: 'Error al enviar el correo electrónico' });
        };
    },

    getMails: async function (req, res) {
        try {
            const contacts = await Contact.find();

            res.json(contacts);
        } catch (error) {
            console.error('Error al obtener los contactos:', error);

            res.status(500).json({ message: 'Error al obtener los contactos' });
        };
    },

    deleteAllContacts: async function (req, res) {
        try {
            await Contact.deleteMany();
            res.status(200).json({ message: 'All contacts have been deleted' });
        } catch (error) {
            console.error('Error al eliminar los contactos:', error);
            res.status(500).json({ message: 'Error al eliminar los contactos' });
        };
    }
};
