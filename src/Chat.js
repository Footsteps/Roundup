import React, { useState, useEffect, useRef } from "react";
import { socket } from "./Socket";
import { Link } from "react-router-dom";
//useSelector runs every time the state is changing
import { useSelector } from "react-redux";
//import { useStatefulFields } from "./useStatefulFields";

export default function Chat() {
    //make it so it scrolls down automaticaly to last message
    const elemRef = useRef();
    const [topic, setTopic] = useState("");
    const [message, setMessage] = useState("");

    const messages = useSelector((state) => state && state.messages);

    useEffect(() => {
        console.log("topic", topic);
        //console.log("state", this.state);
        console.log("message", message);

        if (topic && message) {
            socket.emit("newMessage", { topic: topic, message: message });
        }
        //console.log("Chat hooks component mounted");
        //console.log("elemRef is ", elemRef);
        //how far have we scrolled from the top?
        //console.log("scroll top: ", elemRef.current.scrollTop);
        //height of the container --> 300px fixed height in css
        //console.log("clientheight", elemRef.current.clientHeight);
        //client height + anything that causes it to scroll down --> EVERYTHING: height of container + hidden messages
        //console.log("scroll height:", elemRef.current.scrollHeight);

        //scrolltop = scrollHeight - clientHeight
        //this needs to be redone everytime I get a new chat message
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [messages, topic, message]);

    //console.log("here are my last 10 chat messages", chatMessages);
    //capture text-area
    //pressing enter gives me what is currently in text area

    const keyCheck = (e) => {
        //console.log("e.key", e.key);
        //shows me the input: console.log("value: ", e.target.value);
        //shows me the key that was hit --> Enter: Enter: console.log("key pressed: ", e.key);
        if (e.key === "Enter" || e.key === "Tab") {
            //not make the cursor jump to next line when enter is pressed
            e.preventDefault();
            if (e.target.name == "topic") {
                console.log("I am here!!!");
                //console.log("value: ", e.target.value);
                setTopic(e.target.value);
                e.target.value = "";
            } else {
                console.log("message!!!");
                //console.log("value: ", e.target.value);
                setMessage(e.target.value);
                e.target.value = "";
            }
            //get the mssage
            console.log("topic in keycheck", topic);
            console.log("message in keycheck", message);
            //
            //send message to server

            //clear input fields after emiting
        }
    };

    /*
    const getMessage = (message) => {
        console.log("message in get message", message);
        socket.emit("newMessage", message);
    };
    */

    return (
        <div>
            <p>Welcome to Chat</p>
            <div className="chat-messages-container" ref={elemRef}>
                {messages &&
                    messages.map((user) => (
                        <div key={user.id}>
                            <Link to={`/user/${user.user_id}`}>
                                <img src={user.imageurl} />
                            </Link>

                            <p>
                                {user.first} {user.last}
                            </p>
                            <p>{user.topic}</p>
                            <p>{user.mess}</p>
                        </div>
                    ))}
            </div>
            <div>
                <textarea
                    name="topic"
                    placeholder="Add your message here"
                    onKeyDown={keyCheck}
                ></textarea>
                <textarea
                    name="message"
                    placeholder="Add your message here"
                    onKeyDown={keyCheck}
                ></textarea>
                <button>Submit</button>
            </div>
        </div>
    );
}
