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
    }

    return state;
}

/*RECEIVE_FRIENDS_WANNABES": return new object with all old objects. 1 property gets overwritten: list of friends&wannabes
arr of obj: see database query!
*/

/*retun the new object that has all the same property as the same object, 
except the list of friends & wannabes is replaced with a new array that has all the same objects in it,
1 gets changed: user-object with all the same properties + accepted-property is true (and not false anymore)
--> use map!!!
check if other id: just return object
if id is the same: replace object and set accepted to true  
*/

/*retun the new object that has all the same property as the same object, 
except the list of friends & wannabes is replaced with a new array that has all the same objects in it,
except the one that matches the id that is attached to the action is GONE
--> filter!!!
check if other id: just return object
 





if (action.type == "") {
        console.log("UNFRIEND??? in reducer", action.recipient_id);
        state = {
            ...state,
            connections: state.connections.map((user) => {
                console.log("user", user);

                if (action.recipient_id == user.id) {
                    return {
                        ...user,
                        accepted: null,
                    };
                } else {
                    return user;
                }
            }),
        };
        console.log("state after running unfried", state);
    }
*/
