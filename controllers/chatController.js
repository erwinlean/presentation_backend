"use strict";

const Chat = require("../models/chatModel");
//const createDOMPurify = require('dompurify');
//const { JSDOM } = require('jsdom');

module.exports = {
    getAllChat: async function (req, res) {
        try {
            const allMessages = await Chat.find({}, "message");
            const allDates = await Chat.find({}, "date");

            const responseData = {
                allMessages: allMessages,
                allDates: allDates
            };

            const organizedData = responseData.allMessages.map((message, index) => {
                return { message: message, date: responseData.allDates[index] };
            });

            res.json(organizedData);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        };
    },

    addNewChat: async function (req, res) {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ message: "Message is required" });
        }
        
        //const DOMPurify = createDOMPurify(new JSDOM().window);
        //const sanitizedMessage = DOMPurify.sanitize(message);
        const sanitizedMessage = message;
    
        try {
            const newChatData = new Chat({ message: sanitizedMessage, date: new Date() });
            await newChatData.save();
            
            res.status(201).json({ message: "Chat data added successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        };
    },

    deleteAllChats: async function (req, res) {
        try {
            await Chat.deleteMany();
            res.status(200).json({ message: 'All chats have been deleted' });
        } catch (error) {
            console.error('Error al eliminar los chats:', error);
            res.status(500).json({ message: 'Error al eliminar los chats' });
        };
    }
};