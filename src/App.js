import React from "react";
import axios from "./axios";

//components I need
//import Header from "./Header";
import Chat from "./Chat";
import Friends from "./Friends";
import FindPeople from "./FindPeople";
import OtherProfile from "./OtherProfile";
import Profile from "./Profile";
import ProfilePic from "./ProfilePic";

import Uploader from "./Uploader";
//because I use Browserrouter
import { BrowserRouter, Route } from "react-router-dom";
//because I use link
import { Link } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            first: "",
            last: "",
            imageurl: "",
            bio: "",
            id: "",
        };
    }
    async componentDidMount() {
        //if data is an object, than will loop through the property & add them to state
        //axios.get("/user").then(({ data }) => this.setState(data));

        const { data } = await axios.get("/user");
        this.setState(data.data);
        console.log("This.state after the get requ in user: ", this.state);
    }

    handleClick() {
        axios
            .post("/logout")
            .then(() => {
                location.replace("/welcome");
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    deleteItem() {
        console.log("deleting now!!!!");

        axios
            .post("/delete")
            .then((success) => {
                console.log("success in delete post", success);
                location.replace("/welcome");
            })
            .catch(function (err) {
                console.log(err);
            });
    }

    render() {
        console.log("props: ", this.props);
        if (!this.state.id) {
            return "Loading...";
        }
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <div className="header">
                            <img src="logo.jpg" alt="logo" id="logo" />
                            <div className="link">
                                <Link to="/">Profile</Link>
                            </div>

                            <div className="link">
                                <Link to="/users">Find people</Link>
                            </div>
                            <div className="link">
                                <Link to="/friends">Friends</Link>
                            </div>
                            <div className="link">
                                <Link to="/chat">Chatboard</Link>
                            </div>
                            <div className="link">
                                <span
                                    onClick={(e) => {
                                        if (
                                            window.confirm(
                                                "Are you sure you wish to delete your profile?"
                                            )
                                        )
                                            this.deleteItem(e);
                                    }}
                                >
                                    Delete
                                </span>
                            </div>
                            <div className="link">
                                <span onClick={(e) => this.handleClick(e)}>
                                    Logout
                                </span>
                            </div>

                            <div className="profilePic">
                                <ProfilePic
                                    first={this.state.first}
                                    last={this.state.last}
                                    imageurl={this.state.imageurl}
                                    clickHandler={() =>
                                        this.setState({
                                            uploaderIsVisible: true,
                                        })
                                    }
                                    className={"profilePicHeader"}
                                />
                            </div>
                        </div>
                        <div className="main">
                            <Route
                                exact
                                path="/"
                                render={() => (
                                    <Profile
                                        id={this.state.id}
                                        first={this.state.first}
                                        last={this.state.last}
                                        imageurl={this.state.imageurl}
                                        clickHandler={() =>
                                            this.setState({
                                                uploaderIsVisible: true,
                                            })
                                        }
                                        bio={this.state.bio}
                                        getBio={(newBio) =>
                                            this.setState({ bio: newBio })
                                        }
                                    />
                                )}
                            />

                            <Route
                                exact
                                path="/user/:id"
                                component={OtherProfile}
                            />
                            <Route exact path="/users" component={FindPeople} />
                            <Route exact path="/friends" component={Friends} />
                            <Route exact path="/chat" component={Chat} />
                        </div>
                    </div>
                </BrowserRouter>

                <div>
                    {this.state.uploaderIsVisible && (
                        <Uploader
                            id={this.state.id}
                            getImage={(image) =>
                                this.setState({
                                    imageurl: image,
                                    uploaderIsVisible: false,
                                })
                            }
                            closeHandler={() => {
                                this.setState({
                                    uploaderIsVisible: false,
                                });
                            }}
                        />
                    )}
                </div>
            </div>
        );
    }
}
