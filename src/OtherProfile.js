import React from "react";
import axios from "./axios";
import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";

export default class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            id: "",
            first: "",
            last: "",
            imageurl: "",
            bio: "",
        };
    }

    async componentDidMount() {
        console.log("this.props.match.params.id ", this.props.match.params.id);
        //check if entered /user/id is a number
        if (isNaN(this.props.match.params.id)) {
            console.log("jibberish!!!!");
            this.props.history.push("/");
        } else {
            try {
                const { data } = await axios.get(
                    `/api/user/${this.props.match.params.id}`
                );
                //console.log("data: ", data);
                //triggers if user:id is the same as logged in user
                if (data.sameUser || data.noUser) {
                    this.props.history.push("/");
                } else {
                    this.setState(data.data);
                    console.log(
                        "This.state after the get requ in other user: ",
                        this.state
                    );
                }
            } catch (err) {
                console.log("err in get user/:id!!!", err);
            }
        }
    } //closes componentDidMount

    render() {
        if (!this.state.bio) {
            this.setState({ bio: "no Bio available yet" });
        }
        return (
            <div>
                <h3>hello there</h3>
                <div>
                    <ProfilePic
                        id={this.state.id}
                        first={this.state.first}
                        last={this.state.last}
                        imageurl={this.state.imageurl}
                    />
                </div>

                <div>{this.state.bio}</div>
            </div>
        );
    }
}
