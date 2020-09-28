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
            {/*}
            <div>
                <ProfilePic
                    id={id}
                    first={first}
                    last={last}
                    imageurl={imageurl}
                    clickHandler={clickHandler}
                />
            </div>
    */}
            <div className="profile">
                <h1>Hello {first}!!!</h1>
                <img
                    src={imageurl}
                    alt={`${first} ${last}`}
                    id="profilePicBigger"
                />
            </div>
            <BioEditor id={id} bio={bio} getBio={getBio} />
        </div>
    );
}
