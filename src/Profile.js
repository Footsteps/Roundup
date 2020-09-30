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
        <div>
            <h1>
                Hello {first} {last}!!!
            </h1>
            <div id="profilePicBigger">
                <ProfilePic
                    id={id}
                    first={first}
                    last={last}
                    imageurl={imageurl}
                />
            </div>
            <BioEditor id={id} bio={bio} getBio={getBio} />
        </div>
    );
}
