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

    //const messages = useSelector((state) => state && state.messages);
    //console.log("messages", messages);
    //const topics = const uniqueValues = new Set(arr.map((v) => v.topic));
    //console.log("topics in chat in line 17", topics);
    /*
    const uniqueValues = function () {
        useSelector((state) => state && state.messages).then(() => {
            new Set(messages.map((v) => v.topic));
        });
    };

    console.log("uniquevalues", uniqueValues);
    */
    const chatMessagesByTopic = useSelector(
        (state) => state && state.chatMessagesByTopic
    );
    console.log("chatMessagesByTopic", chatMessagesByTopic);
    const topics = useSelector((state) => state && state.topics);
    console.log("topics in lne 29", topics);

    useEffect(() => {
        console.log("topic", topic);
        //console.log("state", this.state);
        console.log("message", message);

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
    }, [chatMessagesByTopic, topics]);

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
            //console.log("topic in keycheck", topic);
            //console.log("message in keycheck", message);
            //
            //send message to server

            //clear input fields after emiting
        }
    };

    const submitMessage = () => {
        console.log("topic in submit", topic);
        console.log("message in submit", message);
        if (topic && message) {
            socket.emit("newMessage", { topic: topic, message: message });
        }
    };
    /*
    const handleClick = (e) => {
        console.log("e.target.value", e.target.value);
        console.log("getting messages now topic has been clicked!!");
        //socket.emit("chatMessagesByTopic", { topic: topic });
    };
    */

    return (
        <div>
            <p>Welcome to Chat</p>
            <div>
                {topics &&
                    topics.map((topic) => (
                        <div key={topic.id}>
                            <div
                                onClick={() =>
                                    socket.emit("chatMessagesByTopic", {
                                        topic: `${topic.topic}`,
                                    })
                                }
                            >
                                {topic.topic}
                            </div>
                        </div>
                    ))}
            </div>
            <div className="chat-messages-container" ref={elemRef}>
                {chatMessagesByTopic &&
                    chatMessagesByTopic.map((user) => (
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
                    placeholder="What's your topic?"
                    onKeyDown={keyCheck}
                ></textarea>
                <textarea
                    name="message"
                    placeholder="Add your message here"
                    onKeyDown={keyCheck}
                ></textarea>
                <button onClick={submitMessage}>Submit</button>
            </div>
        </div>
    );
}
