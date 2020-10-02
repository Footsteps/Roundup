import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import action creators
import { receiveConnections, acceptFriendRequest, unfriend } from "./actions";

export default function HotOrNot() {
    const dispatch = useDispatch();
    const connections = useSelector((state) => state.connections);

    /*
    const friends = useSelector(
        (state) =>
            state.connections &&
            state.connections.filter((user) => user.accepted)
    );
    */
    /*
const wannabes = useSelector(
    state => state.friendsWannabes && state.friendsWannabes.filter((user)=> !user.accepted)
)
*/

    console.log("connections in Friends line 25", connections);
    useEffect(() => {
        dispatch(receiveConnections());
    }, []);

    if (!connections) {
        console.log("connections is still undefined!!!");
        return null;
    }

    return (
        <div>
            <div>
                <h1>
                    Friends go here, needing first, last, image. Image links to
                    profile. mapping connections-friends needed.
                </h1>
                <button>Unfriend. onclick-action missing</button>
            </div>
            <div>
                <h1>
                    wannabes go here, needing first, last, image. Image links to
                    profile. Mapping connections-wannbes needed
                </h1>
                <button>accept. onclicl-action missing</button>
            </div>
        </div>
    );
}
