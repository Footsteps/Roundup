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
        console.log("connections is still undefined!!!");
        return <div>No connections yet!</div>;
    } else {
        return (
            <div>
                {!friends.length && <div>No friends yet!</div>}
                {friends.length > 0 && (
                    <h1 className="subheading_pictures">See your friends!</h1>
                )}
                <div className="images">
                    {friends &&
                        friends.map((user) => (
                            <div className="container" key={user.id}>
                                <Link to={`/user/${user.id}`}>
                                    <img
                                        src={user.imageurl}
                                        style={{
                                            width: "100%",
                                            height: "80%",
                                        }}
                                    />
                                </Link>

                                <div className="card">
                                    <Link to={`/user/${user.id}`}>
                                        <p
                                            style={{
                                                textDecoration: "underline",
                                            }}
                                        >
                                            {user.first} {user.last}
                                        </p>
                                    </Link>
                                    <div>
                                        <button
                                            id="add"
                                            onClick={() =>
                                                dispatch(unfriend(user.id))
                                            }
                                        >
                                            Unfriend
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                {!wannabes.length && (
                    <div className="subheading_pictures">No requests yet!</div>
                )}

                {wannabes.length > 0 && (
                    <h1 className="subheading_pictures">
                        Your friend requests
                    </h1>
                )}
                <div className="images">
                    {wannabes &&
                        wannabes.map((user) => (
                            <div className="container" key={user.id}>
                                <Link to={`/user/${user.id}`}>
                                    <img
                                        src={user.imageurl}
                                        style={{
                                            width: "100%",
                                            height: "80%",
                                        }}
                                    />
                                </Link>
                                <div className="card">
                                    <Link to={`/user/${user.id}`}>
                                        <p
                                            style={{
                                                textDecoration: "underline",
                                            }}
                                        >
                                            {user.first} {user.last}
                                        </p>
                                    </Link>
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
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}
