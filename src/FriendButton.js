import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendButton({ otherUser }) {
    console.log("otherUser in friendbutton", otherUser);
    const [buttonText, setButtonText] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(
                    "/initial-friendship-status/" + otherUser
                );
                /*
                console.log(
                    "got data from friendships table from get request",
                    data
                );
                */
                if (data.success == false) {
                    setButtonText("Make friend request");
                } else if (data.success == true) {
                    console.log("data after get request", data.data);
                    if (
                        otherUser == data.data.sender_id &&
                        !data.data.accepted
                    ) {
                        console.log(
                            "friendship request there but not accepted!!"
                        );
                        setButtonText("Accept friend request");
                    } else if (
                        otherUser == data.data.recipient_id &&
                        data.data.accepted
                    ) {
                        console.log("friendship request was accepted!!");
                        setButtonText("End friendship");
                    }
                }
            } catch (err) {
                console.log(
                    "err in get if users are in friendshipts table",
                    err
                );
            }
        })();
    }, [buttonText]);

    function handleClick(e) {
        e.preventDefault();
        console.log("button in handleChange", buttonText);
        //Make friend request
        (async () => {
            if (buttonText == "Make friend request") {
                try {
                    //console.log("doing post request now");
                    const { data } = await axios.post(
                        "/send-friend-request/" + otherUser
                    );
                    /*console.log(
                        "data from post request to send-friend-request",
                        data.success
                    );
                    */
                    if (data.success) {
                        setButtonText("Cancel friend request");
                    }
                } catch (err) {
                    console.log("err in post request for friendship", err);
                }
            } else if (buttonText == "Accept friend request") {
                try {
                    //console.log("doing post request now");
                    const { data } = await axios.post(
                        "/accept-friend-request/" + otherUser
                    );
                    console.log(
                        "data from post request to send-friend-request",
                        data
                    );

                    if (data.success) {
                        setButtonText("End friendship");
                    }
                } catch (err) {
                    console.log(
                        "err in post request for accepting friendship",
                        err
                    );
                }
            } else if (
                buttonText == "End friendship" ||
                buttonText == "Cancel friend request"
            ) {
                try {
                    console.log("button ending friendship was clicked!!!!");

                    const { data } = await axios.post(
                        "/end-friendship/" + otherUser
                    );
                    /*
                    console.log(
                        "data from post request to end friendship",
                        data
                    );
                    */

                    if (data.success) {
                        setButtonText("Make friend request");
                    }
                } catch (err) {
                    console.log(
                        "err in post request for accepting friendship",
                        err
                    );
                }
            }
        })();
    }

    return <button onClick={handleClick}>{buttonText}</button>;
}
