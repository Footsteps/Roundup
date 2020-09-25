import React from "react";
import axios from "./axios";
import ResetPw from "./ResetPw";

//my component called Name will have super-powers from react :)
export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageurl: "",
            file: null,
        };
    }

    onChange(e) {
        console.log("this.props", this.props);
        e.preventDefault();
        console.log(e.target.files[0]);
        if (e.target.files[0] == undefined) {
            console.log("error happening!!!!");
            this.setState({
                error: true,
            });
        } else {
            const formData = new FormData();
            formData.append("file", e.target.files[0]);
            formData.append("id", this.props.id);
            axios.post("/upload", formData).then((resp) => {
                console.log("resp after uploading image: ", resp.data.imageurl);
                if (resp.data.success === false) {
                    this.setState({
                        error: true,
                    });
                } else {
                    this.props.getImage(resp.data.imageurl);
                }
                this.props.getImage(resp.data.imageurl);
            });
        }
    }

    render() {
        return (
            <div className="modal">
                <h3>Want to change your picture?</h3>

                {this.state.error && (
                    <p className="error">
                        Something went wrong, please try again!
                    </p>
                )}

                <form method="post">
                    <label>Upload Your File </label>
                    <input type="file" onChange={(e) => this.onChange(e)} />
                </form>
            </div>
        );
    }
}
