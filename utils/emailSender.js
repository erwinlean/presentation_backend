/**
* @param { string } email
* @param { string } nombre
* @returns { void }
*/

"use strict";

const nodemailer = require("nodemailer");
// Style for email function
const {htmlResetEmail} = require("./emailStyles");
require("dotenv").config();

// Variables and transporter
const myEmail = process.env.EMAIL
const mailerUrl = process.env.MAILER;
const transporter = nodemailer.createTransport(mailerUrl);

// Function to send a password reset email
function contactEmail(email, nombre, mensaje) {

    // Create email mensaje
    const mailOptions = {
        from: email,
        to: myEmail,
        subject: "Nuevo mensaje de contacto via Contactos del Porfolio",
        html: htmlResetEmail(nombre, mensaje)
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);

            return;
        } else {
            console.log("Password reset email sent:", info.response);

            return;
        };
    });
};

module.exports = { 
    contactEmail,
 };