"use strict";

const Chat = require("../models/chatModel");

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
        }
    },
    addNewChat: async function (req, res) {
        const { message } = req.body;
    
        try {
            const newChatData = new Chat({ message, date: new Date() });
            await newChatData.save();
    
            res.status(201).json({ message: "Chat data added successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};