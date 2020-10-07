import React, { useEffect, useRef } from "react";
import { socket } from "./Socket";
import { Link } from "react-router-dom";
//useSelector runs every time the state is changing
import { useSelector } from "react-redux";

export default function Chat() {
    //make it so it scrolls down automaticaly to last message
    const elemRef = useRef();

    const messages = useSelector((state) => state && state.messages);

    useEffect(() => {
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
    }, [messages]);

    //console.log("here are my last 10 chat messages", chatMessages);
    //capture text-area
    //pressing enter gives me what is currently in text area

    const keyCheckTopic = (e) => {
        let newTopic;
        //shows me the input: console.log("value: ", e.target.value);
        //shows me the key that was hit --> Enter: Enter: console.log("key pressed: ", e.key);
        if (e.key === "Enter") {
            //not make the cursor jump to next line when enter is pressed
            e.preventDefault();
            //get the mssage
            console.log("our topic: ", e.target.value);
            newTopic = e.target.value;
            //e.target.value = "";
            //send message to server

            const keyCheckMessage = (e, newTopic) => {
                console.log("new topic inseide keyCheckMessage", newTopic);
                //shows me the input: console.log("value: ", e.target.value);
                //shows me the key that was hit --> Enter: Enter: console.log("key pressed: ", e.key);
                if (e.key === "Enter") {
                    //not make the cursor jump to next line when enter is pressed
                    e.preventDefault();
                    //get the mssage
                    console.log("our message: ", e.target.value);
                    //send message to server
                    socket.emit("newMessage", e.target.value);
                    //clear input fields after emiting
                    e.target.value = "";
                }
            };
        }
    };

    /*
    const keyCheckMessage = (e, newTopic) => {
        console.log("new topic inseide keyCheckMessage", newTopic);
        //shows me the input: console.log("value: ", e.target.value);
        //shows me the key that was hit --> Enter: Enter: console.log("key pressed: ", e.key);
        if (e.key === "Enter") {
            //not make the cursor jump to next line when enter is pressed
            e.preventDefault();
            //get the mssage
            console.log("our message: ", e.target.value);
            //send message to server
            socket.emit("newMessage", e.target.value);
            //clear input fields after emiting
            e.target.value = "";
        }
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
                            <p>{user.mess}</p>
                        </div>
                    ))}
            </div>
            <div></div>

            <textarea
                placeholder="What's your topic?"
                onKeyDown={keyCheckTopic}
            ></textarea>
            <textarea
                placeholder="Add your message here"
                onKeyDown={keyCheckMessage}
            ></textarea>
        </div>
    );
}
