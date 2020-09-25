import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newBio: "",
            bioEditorIsVisible: false,
            error: false,
        };
    }
    onClickHandler(e) {
        console.log("change or edit was clicked!!!");
        e.preventDefault();
        this.setState({
            bioEditorIsVisible: true,
        });
    }

    handleChange(e) {
        console.log(" bio is being entered!!!!");
        e.preventDefault();
        this.setState(
            {
                newBio: e.target.value,
            },
            () => console.log("this.state: ", this.state)
        );
    }
    async handleSubmit(e) {
        console.log("submit bio was hit!!!!");
        e.preventDefault();
        console.log("this state in submit: ", this.state.newBio);
        if (this.state.newBio === "") {
            console.log("error happening!!!!");
            this.setState({
                error: true,
            });
        } else {
            console.log(
                "everything worked out well in submit bio, doing axios now!!!!"
            );
            console.log("id, bio: ", this.props.id, this.state.newBio);

            try {
                const { data } = await axios.post("/bio", {
                    id: this.props.id,
                    newBio: this.state.newBio,
                });
                console.log("code post worked!!!!");
                console.log("resp in post code", data);
                this.setState({ bioEditorIsVisible: false });
                this.props.getBio(data.newBio);
            } catch (e) {
                this.setState({
                    error: true,
                });
            }
        }
    }

    render() {
        let elem;
        console.log("props: ", this.props);
        //id: 2, bio: null, getBio: f
        if (!this.props.bio && this.state.bioEditorIsVisible == false) {
            console.log("showing the bio and currentDisplay is 1");
            elem = (
                <div>
                    <button
                        type="button"
                        onClick={(e) => this.onClickHandler(e)}
                    >
                        Want to add a bio?
                    </button>
                </div>
            );
        } else if (this.props.bio && this.state.bioEditorIsVisible == false) {
            console.log("showing the bio and currentDisplay is 1");
            elem = (
                <div>
                    <div>{this.props.bio}</div>
                    <button
                        type="button"
                        onClick={(e) => this.onClickHandler(e)}
                    >
                        Want to change your bio?
                    </button>
                </div>
            );
        } else {
            console.log("bio editor is visible!!!!");
            elem = (
                <div>
                    {this.state.error && (
                        <p className="error">
                            Something went wrong, please try again!
                        </p>
                    )}
                    <label htmlFor="newBio">enter your first name:</label>
                    <textarea
                        onChange={(e) => this.handleChange(e)}
                        id="addBio"
                        name="newBio"
                        rows="4"
                        cols="50"
                    ></textarea>
                    <button onClick={(e) => this.handleSubmit(e)}>
                        Submit
                    </button>
                </div>
            );
        }
        return <div>{elem}</div>;
    }
}
