import axios from "./axios";

export async function receiveConnections() {
    //console.log("running receiveConnections noW!!!");
    const { data } = await axios.get("/get-connections/");
    //console.log("received data in receiveConnections", data.data);

    return {
        type: "RECEIVE_CONNECTIONS",
        connections: data.data,
    };
}

export async function unfriend(id) {
    //console.log("unfriend is running!!!!", id);
    const { data } = await axios.post("/end-friendship/" + id);
    //console.log("data from post request to end friendship IN ACTIONS.JS", data);
    //console.log("data post requ end friendship IN ACTIONS.JS", data.id);

    return { type: "UNFRIEND", id: data.id };
}

export async function acceptFriendRequest(id) {
    console.log("acceptFriendRequest is running!!!!", id);

    const { data } = await axios.post("/accept-friend-request/" + id);
    console.log("data from post req to ACCEPT FRIEND IN ACTIONS.JS", data);
    console.log("data from post req to ACCEPT FRIEND IN ACTIONS.JS", data.id);

    return { type: "ACCEPT_FRIEND_REQUEST", id: data.id };
}

export async function rejectFriendRequest(id) {
    //console.log("unfriend is running!!!!", id);
    const { data } = await axios.post("/end-friendship/" + id);
    //console.log("data from post request to end friendship IN ACTIONS.JS", data);
    //console.log("data post requ end friendship IN ACTIONS.JS", data.id);

    return { type: "REJECT", id: data.id };
}

export async function chatMessages(messages) {
    //console.log("chatMessages is running!!!!", messages);

    //console.log("data from post request to end friendship IN ACTIONS.JS", data);
    //console.log("data post requ end friendship IN ACTIONS.JS", data.id);

    return { type: "GET_MESSAGES", messages: messages };
}

export async function chatTopics(topics) {
    //console.log("chatMessages is running!!!!", messages);

    //console.log("data from post request to end friendship IN ACTIONS.JS", data);
    //console.log("data post requ end friendship IN ACTIONS.JS", data.id);

    //return { type: "GET_TOPICS" };
    return { type: "GET_TOPICS", topics: topics };
}

export async function chatMessage(message) {
    console.log("chatMessage is running!!!!", message);

    return { type: "ADD_MESSAGE", message: message };
}

export async function chatMessagesByTopic(chatMessagesByTopic) {
    console.log("chatMessagesByTopic is running!!!!", chatMessagesByTopic);

    return {
        type: "CHAT_MESSAGES_BY_TOPIC",
        chatMessagesByTopic: chatMessagesByTopic,
    };
}
