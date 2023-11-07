"use strict";

require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const Contact = require('../models/contactModel');
//const createDOMPurify = require('dompurify');
//const { JSDOM } = require('jsdom');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    sendEmail: async function (req, res) {
        const { email, nombre, mensaje } = req.body;
    
        if (!email || !nombre || !mensaje) {
            return res.status(400).json({ message: 'Email, name, and message are required' });
        };
        
        //const DOMPurify = createDOMPurify(new JSDOM().window);
        //const sanitizedEmail = DOMPurify.sanitize(email);
        //const sanitizedNombre = DOMPurify.sanitize(nombre);
        //const sanitizedMensaje = DOMPurify.sanitize(mensaje);
        const sanitizedEmail = email;
        const sanitizedNombre = nombre;
        const sanitizedMensaje = mensaje;
    
        try {
            const contact = new Contact({ email: sanitizedEmail, nombre: sanitizedNombre, mensaje: sanitizedMensaje });
            await contact.save();
    
            const msg = {
                to: process.env.MAIL_TO,
                from: process.env.MAIL_FROM,
                subject: 'Mensaje de contacto',
                text: `Nombre: ${sanitizedNombre}\n${sanitizedEmail} \nMensaje: ${sanitizedMensaje}`,
            };
    
            await sgMail.send(msg);
    
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