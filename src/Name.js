import React from "react";
import axios from "axios";

//my component called Name will have super-powers from react :)
export default class Name extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cohort: "cumin",
            name: "Angela",
        };
        {
            /*this.handleClick = this.handleClick.bind(this);*/
        }
    }
    componentDidMount() {
        /*
        axios.get("/some-route").then((resp) => {
            console.log(resp);
        });
        */
        setTimeout(() => {
            //whenever I want to update state in react, i have to use that function!!!
            this.setState({
                //update cohort
                cohort: "CUMINNNNNNN!!! <3",
                //add a new thing
                lastName: "Schumacher",
            });
        }, 2000);
    } //closes componentDidMount

    handleClick() {
        //console.log("sanity check handleclick");
        /*
        axios.post('/some-route-here').then(resp => {
            console.log('resp: ', resp);
        })
        */
        //update state
        console.log("this in handleClick: ", this);
        this.setState({
            cohort: "clicked on cumin!!!",
        });
        console.log("this state in handleclick", this.state);
    }

    render() {
        console.log("props: ", this.props);
        return (
            <div>
                {/*solution number 1: arrow-function approach 
                <p onClick={() => this.handleClick()}>
                
                solution number 2: bind
                this.handleClick = this.handleClick.bind(this);*/}
                <p onClick={() => this.handleClick()}>
                    Welcome to React, {this.state.cohort}
                </p>
                {/*if this.state.LastName existes, render p-tag!!!! */}
                {this.state.lastName && (
                    <p> Your last name is: {this.state.lastName}</p>
                )}
                <h3>{this.props.cuteAnimal}</h3>
            </div>
        );
    }
}
