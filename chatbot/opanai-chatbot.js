"user strict";

const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// User request
const context = []; // Used for the AI to check the last responses and have context
const lenguaje = "spanish";

// ChatBot
async function send_get_request(context, quest) {
    try {
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: `You are a friendly chat bot, limited with 100 words per answer. Always respond with zoombies thematic related. Your language for responses will be always and 100% ${lenguaje}`
                },
                {
                    role: "user",
                    content: `If there is something of context is this: ${context[0]}, else it's a new chat, with a new question. Question:\n${quest}`
                }
            ],
            temperature: 0
        });

        return chatCompletion.data.choices[0].message; // Devuelve la respuesta del chatbot
    } catch (err) {
        console.log("Error: " + err.message);
        return ''; // Devuelve una cadena vacía en caso de error
    }
}

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('sendMessage', async (message) => {
        const response = await send_get_request(context, message);
        context.push(message); // Agrega el mensaje del usuario al contexto
        context.push(response); // Agrega la respuesta del chatbot al contexto
        socket.emit('chatbotResponse', response);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server listening on port 3000');
});