import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import action creators
import {
    receiveConnections,
    acceptFriendRequest,
    unfriend,
    rejectFriendRequest,
} from "./actions";

export default function Friends() {
    const dispatch = useDispatch();
    const connections = useSelector((state) => state.connections);
    const friends = useSelector(
        (state) =>
            state.connections &&
            state.connections.filter((user) => user.accepted)
    );

    const wannabes = useSelector(
        (state) =>
            state.connections &&
            state.connections.filter((user) => !user.accepted)
    );

    console.log("connections in Friends line 22", connections);
    console.log("friends in Friends line 24", friends);
    console.log("wannabes in Friends line 23", wannabes);

    //get list of users who either have pending requests or are already friends
    useEffect(() => {
        dispatch(receiveConnections());
    }, []);

    if (!connections) {
        //console.log("connections is still undefined!!!");
        return null;
    }

    return (
        <div>
            <h1>Friends</h1>
            <div>
                {connections &&
                    friends.map((user) => (
                        <div key={user.id}>
                            <Link to={`/user/${user.id}`}>
                                <img src={user.imageurl} />
                            </Link>

                            <p>
                                {user.first} {user.last}
                            </p>
                            <div>
                                <button
                                    onClick={() => dispatch(unfriend(user.id))}
                                >
                                    Unfriend
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
            <div>
                <h1>Who wants to be friends with you?</h1>
                <div>
                    {connections &&
                        wannabes.map((user) => (
                            <div key={user.id}>
                                <Link to={`/user/${user.id}`}>
                                    <img src={user.imageurl} />
                                </Link>
                                <p>
                                    {user.first} {user.last}
                                </p>
                                <div>
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                acceptFriendRequest(user.id)
                                            )
                                        }
                                    >
                                        Accept request
                                    </button>
                                    <button
                                        onClick={() =>
                                            dispatch(
                                                rejectFriendRequest(user.id)
                                            )
                                        }
                                    >
                                        Reject request
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
