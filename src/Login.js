import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: false,
        };
    }

    handleLogin(e, field) {
        //to see everything I am typing in because input is stored in event-object */

        //console.log("e.target.value: ", e.target.value);

        //*store value in state */
        this.setState(
            {
                [field]: e.target.value,
            },
            () => {
                console.log("this.state in handleLogin", this.state);
            }
        );
    }

    handleSubmitLogin(e) {
        console.log("submit was hit!!!!", this.state);
        e.preventDefault();
        if (this.state.email === "" || this.state.password === "") {
            console.log("error happening!!!!");
            this.setState({
                error: true,
            });
        } else {
            console.log(
                "everything worked out well in Login, doing axios now!!!!"
            );
            console.log("this.state in else Login", this.state);
            axios
                .post("/login", {
                    email: this.state.email,
                    password: this.state.password,
                })
                .then((resp) => {
                    console.log("login post worked!!!!");
                    console.log("resp in login", resp.data.success);
                    //data: userId: 8, success: true
                    if (resp.data.success === true) {
                        location.replace("/");
                    } else {
                        this.setState({
                            error: true,
                        });
                    }
                });
        }
    }

    render() {
        return (
            <div>
                <h3>Login here:</h3>

                {this.state.error && (
                    <p className="error">
                        Something went wrong, please try again!
                    </p>
                )}
                <form onSubmit={(e) => this.handleSubmitLogin(e)} method="POST">
                    <label htmlFor="email">enter your email</label>
                    <input
                        onChange={(e) => this.handleLogin(e, "email")}
                        name="email"
                        placeholder="email address"
                    />
                    <label htmlFor="password">enter your password</label>
                    <input
                        type="password"
                        onChange={(e) => this.handleLogin(e, "password")}
                        name="password"
                    />
                    <input type="submit" value="Submit" />
                </form>
                <Link to="/reset">Click here to reset your password</Link>
            </div>
        );
    }
}
