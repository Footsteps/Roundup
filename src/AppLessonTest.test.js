import React from "react";
import AppLessonTest from "./AppLessonTest";
import { render, waitForElement } from "@testing-library/react";
import axios from "./axios";

jest.mock("./axios");

axios.get.mockResolvedValue({
    data: {
        first: "Funky",
        last: "Chicken",
        url: "/funkychicken.jpg",
        id: 1,
    },
});

test("app eventually shows a div", async () => {
    const { container } = render(<AppLessonTest />);

    console.log("To start, the html is: " + container.innerHTML);

    expect(container.innerHTML).toBe("");

    await waitForElement(() => container.querySelector("div"));

    console.log("After waiting the html is: " + container.innerHTML);

    expect(container.querySelector("div").children.length).toBe(1);
});
