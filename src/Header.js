import React from "react";
import axios from "./axios";

const Header = () => {
    const handleClick = () => {
        axios
            .post("/logout")
            .then(() => {
                location.replace("/welcome");
            })
            .catch(function (err) {
                console.log(err);
            });
    };
    return (
        <header className="header">
            <img src="./logo.jpg" alt="logo" id="logo" />

            <span onClick={handleClick}>Click here to logout</span>
        </header>
    );
};

export default Header;
