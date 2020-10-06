export default function (state = {}, action) {
    if (action.type == "RECEIVE_CONNECTIONS") {
        state = {
            ...state,
            connections: action.connections,
        };
    }
    //console.log("state after adding connections", state);
    //console.log("...and state.connections", state.connections);

    if (action.type == "UNFRIEND" || action.type == "REJECT") {
        console.log("action.id in reducer", action.id);

        state = {
            ...state,
            connections: state.connections.filter(
                (user) => user.id != action.id
            ),
        };

        console.log("state after running unfried", state);
    } else if (action.type == "ACCEPT_FRIEND_REQUEST") {
        //console.log("action IN ACCEPT FRIEND REQUEST", action);

        state = {
            ...state,
            connections: state.connections.map((user) => {
                //console.log("action.id", action.id);
                //console.log("user.id", user.id);

                if (action.id == user.id) {
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
        console.log("state after running accept friend", state);
    } else if (action.type == "GET_MESSAGES") {
        state = {
            ...state,
            messages: action.messages,
        };
    } else if (action.type == "ADD_MESSAGE") {
        console.log("action", action.message);

        state = {
            ...state,
            messages: [...state.messages, action.message],
        };

        console.log("state after running adding new message", state);
    }
    //console.log("state after adding messages", state);
    //console.log("...and state.messages", state.messages);

    return state;
}
