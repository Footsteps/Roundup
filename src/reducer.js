function reducer(state = {}, action) {
    if ((action.type = "CHANGE_BIO")) {
        //state change will happen here
        //first: copy state by ...state,
        //then: update
        state = {
            ...state,
            //otherUser is an object inside of state, so I have to copy that to
            otherUser: {
                ...state.otherUser,
                bio: action.payload,
            },
        };
    }

    if ((action.type = "CHANGE_NAME")) {
        //state change will happen here
    }

    //return state
    return state;
}
