import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            email: "",
            password: "",
            error: false,
        };
    }

    handleChange(e, field) {
        //to see everything I am typing in because input is stored in event-object */

        //console.log("e.target.value: ", e.target.value);

        //*store value in state */
        this.setState(
            {
                [field]: e.target.value,
            },
            () => {
                console.log("this.state in handleChange", this.state);
            }
        );
    }

    handleSubmit(e) {
        console.log("submit was hit!!!!", this.state);
        e.preventDefault();
        if (
            this.state.first === "" ||
            this.state.last === "" ||
            this.state.email === "" ||
            this.state.password === ""
        ) {
            console.log("error happening!!!!");
            this.setState({
                error: true,
            });
        } else {
            console.log("everything worked out well, doing axios now!!!!");
            console.log("this.state in else", this.state);
            axios
                .post("/register", {
                    first: this.state.first,
                    last: this.state.last,
                    email: this.state.email,
                    password: this.state.password,
                })
                .then((resp) => {
                    console.log("register post worked!!!!");
                    console.log("resp in register", resp.data.userId);
                    //data: userId: 8
                    location.replace("/");
                });
        }
    }

    //code to redirect user to slash-route
    //location.replace('/')
    render() {
        return (
            <div>
                <Link to="/login">Click here to login</Link>
                <h3>Register here:</h3>

                {this.state.error && (
                    <p className="error">
                        Something went wrong, please try again!
                    </p>
                )}
                <label htmlFor="first">enter your first name</label>

                <form onSubmit={(e) => this.handleSubmit(e)} method="POST">
                    <input
                        onChange={(e) => this.handleChange(e, "first")}
                        name="first"
                        placeholder="first name"
                    />
                    <label htmlFor="last">enter your last name</label>
                    <input
                        onChange={(e) => this.handleChange(e, "last")}
                        name="last"
                        placeholder="last name"
                    />
                    <label htmlFor="email">enter your email</label>
                    <input
                        onChange={(e) => this.handleChange(e, "email")}
                        name="email"
                        placeholder="email address"
                    />
                    <label htmlFor="password">enter your password</label>
                    <input
                        type="password"
                        onChange={(e) => this.handleChange(e, "password")}
                        name="password"
                    />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
