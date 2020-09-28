import React from "react";
import BioEditor from "./BioEditor";
import axios from "./axios";
import { render, fireEvent, waitForElement } from "@testing-library/react";

jest.mock("./axios");

test("When no bio is passed, the add a bio button shows", () => {
    const { container } = render(<BioEditor />);

    //console.log("this is my consolge.log: ", container.innerHTML);

    expect(container.innerHTML).toContain("Want to add a bio?");
});

//

test("When a bio is passed to it, an change-your-bio button is rendered.", () => {
    const { container } = render(<BioEditor bio="this is a bio!!!" />);

    //console.log("this is my consolge.log: ", container.innerHTML);

    expect(container.innerHTML).toContain("Want to change your bio?");
});

//Clicking either the "Add" or "Edit" button causes a textarea and a "Save" button to be rendered.

test("Clicking either the Add or Edit button causes a textarea and a Save button to be rendered.", () => {
    //define onclick here
    const onClick = jest.fn(() =>
        this.setState({
            bioEditorIsVisible: true,
        })
    );
    //now pass onClick function to profile picture
    const { container } = render(<BioEditor onClick={onClick} />);

    fireEvent.click(container.querySelector("button"));

    //expect(container.innerHTML).toContain("Time to get crazy");

    expect(container.innerHTML).toContain("Submit");

    //make test fail
    //expect.(onClick.mock.calls.length).toBe(2);
});

//Clicking the "Save" button causes an ajax request. The request should not actually happen during your test. To prevent it from actually happening, you should mock axios.

test.only("click save button causes an ajax request", async () => {
    jest.mock("./axios");
    const onClick = jest.fn(
        axios.get.mockResolvedValue({
            data: {
                newBio: "Bio of the funky chicken",
                id: 1,
            },
        })
    );

    const { container } = render(<BioEditor onClick={onClick} />);

    fireEvent.click(container.querySelector("button"));

    console.log("To start, the html is: " + container.innerHTML);

    //expect(container.innerHTML).toBe("");

    await waitForElement(() => container.querySelector("div"));

    console.log("After waiting the html is: " + container.innerHTML);
});
