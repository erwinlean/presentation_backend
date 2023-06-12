"use strict";

require('dotenv').config()
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//const apiKey = `${process.env.SENDGRID_API_KEY}`;
//console.log("SendGrid key ", apiKey);

module.exports = {
    sendEmail: async function (req, res) {
    const { email, nombre, mensaje } = req.body;

    //console.log(req.body);
    console.log(email," ", nombre," ", mensaje);

    try {
        const msg = {
            to: `${process.env.MAIL_TO}`,
            from: email,
            subject: 'Mensaje de contacto',
            text: `Nombre: ${nombre}\nMensaje: ${mensaje}`,
        };

        await sgMail.send(msg);

        res.status(200).json({ message: 'Correo electrónico enviado exitosamente' });
    }catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        res.status(500).json({ message: 'Error al enviar el correo electrónico' });
    }}
};