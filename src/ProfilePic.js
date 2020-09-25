import React from "react";

//profile pic does not need state --> the only this it does is show an image who's info comes from App
//function gets passed props from App and uses them
//and it gets the function clickHandler from App
//this way, App knows when to make the uploader appear because the profile pic was clicked
export default function ({ imageurl, first, last, clickHandler }) {
    if (!imageurl) {
        imageurl = "./default.jpeg";
    }
    return (
        <div>
            <img
                src={imageurl}
                alt={`${first} ${last}`}
                onClick={clickHandler}
                id="profilePic"
            />
        </div>
    );
}
