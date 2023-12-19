"use strict";

const Chat = require("../models/chatModel");
const { checkInputs } = require("../middleware/security");

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
        };

        if(checkInputs(message)){
            return res.status(401).json({message: "Message data error, check input and try again."});
        };
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