import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    const [userInput, setUserInput] = useState("");
    const [foundUsers, setFoundUsers] = useState([]);
    const [success, setSuccess] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                if (!userInput) {
                    console.log("no user input yet!!!");
                    let nix;
                    const { data } = await axios.get("/users/" + nix);
                    console.log("data if no user input", data.data);
                    setFoundUsers(data.data);
                } else {
                    console.log("user input,else is running!!!");
                    const { data } = await axios.get("/users/" + userInput);
                    console.log("data if user input", data.data);
                    if (data.data == undefined) {
                        console.log("data is undefined!!!");
                        setSuccess(false);
                    } else {
                        setFoundUsers(data.data);
                        setSuccess(true);
                    }
                }
            } catch (err) {
                console.log("err", err);
            }
        })();
    }, [userInput]);

    function handleChange(e) {
        console.log("e.target.value", e.target.value);
        setUserInput(e.target.value);
        console.log("foundUsers: ", foundUsers);
    }

    return (
        <div>
            {userInput ? (
                <div>
                    {!success && (
                        <div>
                            <p className="error">Sorry, no search results!!</p>
                            <h1>Want to try again?</h1>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="userInput"
                            />
                        </div>
                    )}
                    {success && (
                        <div>
                            <h1>Here are youre results!!</h1>
                            {foundUsers.map((user, i) => {
                                if (!user.imageurl) {
                                    user.imageurl = "./default.jpeg";
                                }
                                return (
                                    <div key={i}>
                                        <img src={user.imageurl} />
                                        <span>
                                            {user.first} {user.last}
                                        </span>
                                        <span> Bio:{user.bio}</span>
                                    </div>
                                );
                            })}
                            <h1>Looking for somebody else yet?</h1>
                            <input
                                onChange={handleChange}
                                type="text"
                                name="userInput"
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h1>Check out who just joined!</h1>
                    {foundUsers.map((user, i) => {
                        if (!user.imageurl) {
                            user.imageurl = "./default.jpeg";
                        }
                        return (
                            <div key={i}>
                                <img src={user.imageurl} />
                                <span>
                                    {user.first} {user.last}
                                </span>
                                <span> Bio:{user.bio}</span>
                            </div>
                        );
                    })}
                    <h1>Are you looking for someone in particular?</h1>
                    <input
                        onChange={handleChange}
                        type="text"
                        name="userInput"
                    />
                </div>
            )}
        </div>
    );
}
