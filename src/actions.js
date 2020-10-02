import axios from "axios";

export async function receiveConnections() {
    console.log("otherUser in receiveConnections");
    const { data } = await axios.get("/get-connections/");
    console.log(data);
    /*
    return {
        type: "RECEIVE_CONNECTIONS",
        connections: data.users,
    };
    */
}

/*receiveFriendsWannabes gets friends & wannabes
export async function receiveFriendsWannabes() {
    const { data } = await axios.get("friends-wannabes.json");
    return {
        type: "RECEIVE_FRIENDS_WANNABES",
        friendsWannabes: data.users,
    };
}

*/

/*
export async function acceptFriendRequest(id) {
    const { data } = await axios.post("/???");
    --> updata data base with accesppted, use route I have in other profile
    --> return user_id 
    return {
        type: "ACCEPT_FRIEND_REQUEST",
        id of user who is now a friend
    };
}
*/

/*
export async function unfriend(id) {
    const { data } = await axios.post("/???");
    --> updata data base with accesppted, use route I have in other profile for ending friendship
    --> return user_id 
    return {
        type: "UNFRIEND",
        id of user is now not a friend anymore
    };
}
*/
