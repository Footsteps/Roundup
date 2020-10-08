//this file listens for messages from server

import * as io from "socket.io-client";

import {
    chatMessages,
    chatMessage,
    chatTopics,
    chatMessagesByTopic,
} from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatTopics", (rows) => {
            console.log(
                "these are the topics from index which i want to store in state",
                rows
            );

            store.dispatch(chatTopics(rows));
        });

        //socket.on("chatMessages", (msgs) => store.dispatch(chatMessages(msgs)));
        socket.on("chatMessages", (rows) => {
            /*
            console.log(
                "these are the last 10 messages from index which i want to store in state",
                rows
            );
            */
            store.dispatch(chatMessages(rows));
        });

        //socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));
        socket.on("addNewMessage", (message) => {
            console.log(
                "my new message i got from index which i now want to store in state",
                message
            );
            store.dispatch(chatMessage(message));
        });

        socket.on("chatMessagesByTopic", (rows) => {
            console.log(
                "these are the messages ordered by topic from index which i want to store in state",
                rows
            );

            store.dispatch(chatMessagesByTopic(rows));
        });
    }
};
