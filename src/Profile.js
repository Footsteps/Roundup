import React from "react";

import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";

export default function Profile({
    id,
    first,
    last,
    imageurl,
    bio,
    clickHandler,
    getBio,
    closeHandler,
}) {
    console.log(
        "id, first, last, imageurl, clickhandler, getbio in Profile",
        id,
        first,
        last,
        imageurl,
        bio,
        clickHandler,
        getBio,
        closeHandler
    );

    if (!imageurl) {
        imageurl = "./default.jpeg";
    }

    return (
        <div className="container">
            <div className="card">
                <h1 className="subheading_pictures">
                    Hello {first} {last}!
                </h1>
            </div>
            <div>
                <div id="profilePicBigger" className="images">
                    <ProfilePic
                        id={id}
                        first={first}
                        last={last}
                        imageurl={imageurl}
                        style={{ width: "100%", height: "80%" }}
                    />
                </div>
                <BioEditor id={id} bio={bio} getBio={getBio} />
            </div>
        </div>
    );
}
