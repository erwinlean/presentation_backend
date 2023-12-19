/**
 * @param {string} mensaje
 * @param {string} nombre
 * @returns {string}
*/
"use strict";

function htmlResetEmail(nombre, mensaje) {

    // Style added directly as HTML
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; text-align: center; color:black;">
            <img src="${logo}" style="width: 100px; height: auto; margin-bottom: 20px;" alt='Eco-encuentro logo' title="Eco-encuentro Logo"/>
            <h1 style="color: #61AE4E;">Mensaje de: ${nombre}</h1>
            <br>
            <p style="font-size: 18px; margin-bottom: 20px;">${mensaje}</p>
            <br> 
        </div>
    `;
};

module.exports = {
    htmlResetEmail,
};