export function myActionCreator(bio) {
    //if we need to commuicatoe with the server we would do it here
    const data = await.axios.post("/update-bio", { bio });

    return {
        //type is a string and it is capitalized
        type: "CHANGE_BIO",
        bio: bio,
    };
}

export function myOtherActionCreator(name) {
    return {
        //type is a string and it is capitalized
        type: "CHANGE_NAME",
        name: name,
    };
}
