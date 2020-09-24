import React from "react";
import axios from "./axios";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";

export default class Registration extends React.Component {
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
    /*
    getImage(image) {
        this.setState({ imageurl: image });
    }
    */
    render() {
        console.log("props: ", this.props);
        if (!this.state.id) {
            return "Loading...";
        }
        return (
            <div>
                <img src="/logo.jpg" alt="logo" />
                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    imageurl={this.state.imageurl}
                    clickHandler={() =>
                        this.setState({ uploaderIsVisible: true })
                    }
                />
                {this.state.uploaderIsVisible && (
                    <Uploader
                        id={this.state.id}
                        getImage={(image) =>
                            this.setState({
                                imageurl: image,
                                uploaderIsVisible: false,
                            })
                        }
                    />
                )}
            </div>
        );
    }
}

//this.state.uploaderIsVisible && <Uploader setImage={() => this.setState({imageUrl: })}
//<Uploader cuteAnimal={this.state.id} setImage={(id) => this.setState({ imageurl: })} />
