//this file listens for messages from server

import * as io from "socket.io-client";

import { chatMessages, chatMessage } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

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
    }
};
