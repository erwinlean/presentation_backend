"use strict";

const { OpenAI } = require("openai");
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// User request 
const context = [];
const devInformation= `Hola, soy un desarrollador de software (hace 3 años me inicie en este mundo) y me fascina sumergirme en el mundo de la tecnología y la programación. Siempre estoy dispuesto a aprender y mejorar en lo que hago. e especializo en el desarrollo de aplicaciones utilizando JavaScript (Node.js, Express, Angular), también tengo conocimientos básicos Electron & Ionic. Además, manejo PHP, Linux, Docker y otras herramientas esenciales de programación.
Actualmente, me encuentro trabajando como Software Engineer Jr. en Criteria Online. Mi rol se centra en la creación de conectores bidireccionales mediante API entre sistemas como ERP, PIM, DAM y eCommerce. Mi objetivo es asegurar una comunicación fluida y eficiente entre estas plataformas para facilitar la gestión de datos y mejorar la experiencia del usuario.
Estoy comprometido con seguir aprendiendo y adquiriendo nuevas habilidades en el mundo de la programación para crecer profesionalmente y aportar soluciones innovadoras en cada proyecto en el que participo.
Cuando no estoy frente a la computadora, me encanta pasar tiempo al aire libre, especialmente en la playa. El surf es deporte favorito y en cual me da paz, disfruto montando las olas y sintiendo esa conexión única con el mar. También adoro la sensación del sol y la arena entre mis pies.
Además de los deportes acuáticos, los videojuegos son una de mis grandes pasatiempos. Me encanta sumergirme en estos.
Cuando necesito relajarme, me sumerjo en el mundo de las series de televisión. Disfruto de series como "Malcolm in the middle", "E.R. Emergencias", "Friends", "Rick and Morty", entre otras.
Los animales me encantan, especialmente los gatos, ocupan un lugar especial en mi corazón y cuento con dos de ellos, junto con una perra. Siempre encuentro un poco de paz y felicidad cuando estoy cerca de ellos.
En resumen, soy un desarrollador de software, apasionada por el surf, la playa, los videojuegos, la programación (si de nuevo), las series de televisión y los gatos (y perros). Asi disfruto mi vida, dia a dia.`

// ChatBot
async function send_get_request(quest) {

    let all_context =  context.join('\n');
    //console.log(all_context)

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a friendly chat bot (also a cat), limited with 100 words per answer. Always respond as a cat, and answer in relation or mentioning to the information of the owner of the page ${devInformation}. Your language for responses will be the same lenguaje of the "${quest}:". If the quest mention contact to your owned, creator, or something like this, tell in the message my email for contact: Erwin.mdq@gmail.com.`
                },
                {
                    role: "user",
                    content: `Context of the quest: "${all_context}"(may dont have anything if is the first question). Question:\n${quest}`
                }
            ],
            temperature: 1,
            max_tokens:1024
        });

        return chatCompletion.choices[0].message;
    } catch (err) {
        console.log("Error: " + err.message);
        console.log(err.response);

        return '';
    };
};

async function main(message_received) {
    context.push(message_received);
    const response = await send_get_request(message_received);

    return response.content;
}

module.exports = main;