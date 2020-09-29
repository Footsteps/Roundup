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
}) {
    console.log(
        "id, imageurl, first, last, clickhandler, getbio",
        id,
        first,
        last,
        imageurl,
        bio,
        clickHandler,
        getBio
    );

    return (
        <div>
            <ProfilePic
                id={id}
                first={first}
                last={last}
                imageurl={imageurl}
                clickHandler={clickHandler}
            />

            <div>
                <h1>
                    Hello {first} {last}!!!
                </h1>
                <img
                    src={imageurl}
                    alt={`${first} ${last}`}
                    id="profilePicBig"
                />
            </div>

            <BioEditor id={id} bio={bio} getBio={getBio} />
        </div>
    );
}
