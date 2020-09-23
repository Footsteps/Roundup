import React from "react";
import axios from "./axios";

export default class ResetPw extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            currentDisplay: 1,
            error: false,
        };
    }

    handleReset(e, field) {
        //to see everything I am typing in because input is stored in event-object */

        //console.log("e.target.value: ", e.target.value);

        //*store value in state */
        this.setState(
            {
                [field]: e.target.value,
            },
            () => {
                console.log("this.state in handleReset", this.state);
            }
        );
    }

    handleSubmitReset(e) {
        console.log("submit was hit!!!!", this.state);
        e.preventDefault();
        if (this.state.email === "") {
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
                .post("/reset", {
                    email: this.state.email,
                })
                .then((resp) => {
                    console.log("login post worked!!!!");
                    console.log("resp in login", resp.data.successCode);

                    //data: userId: 8, success: true
                    if (resp.data.successCode === false) {
                        this.setState({
                            error: true,
                        });
                    } else {
                        console.log("user exists. email was send");
                        this.setState({
                            currentDisplay: 2,
                        });
                    }
                });
        }
    }

    render() {
        let elem;
        if (this.state.currentDisplay == 1) {
            console.log("current display is one!!!!");
            elem = (
                <div>
                    <h3>Reset Password:</h3>

                    {this.state.error && (
                        <p className="error">
                            Something went wrong, please try again!
                        </p>
                    )}
                    <form
                        onSubmit={(e) => this.handleSubmitReset(e)}
                        method="POST"
                    >
                        <label htmlFor="email">
                            Please enter the email adress with which you
                            registered
                        </label>
                        <input
                            onChange={(e) => this.handleReset(e, "email")}
                            name="email"
                            placeholder="email address"
                        />
                        <input type="submit" value="Submit" />
                    </form>
                </div>
            );
        }
        if (this.state.currentDisplay == 2) {
            console.log("current display is two!!!!");
            elem = (
                <div>
                    <h3>we have reached current display 2:</h3>

                    {this.state.error && (
                        <p className="error">
                            Something went wrong, please try again!
                        </p>
                    )}
                </div>
            );
        }
        return (
            <div>
                <h3>THIS IS WHAT I ALWAYS WANT TO SHOW</h3>
                {elem}
            </div>
        );
    }
}
