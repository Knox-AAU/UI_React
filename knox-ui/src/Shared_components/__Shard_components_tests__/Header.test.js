import { render } from '@testing-library/react';
import Components from "../Header";
import React from 'react'

// Tests for the header components 
describe("Components in header", () => {

    test("Rendered stickyBox", () => {
        const { queryByTestId } = render(<Components />);
        const stickyBox = queryByTestId("stickyBox");
        expect(stickyBox).toBeTruthy();
    })

    test("Rendered container", () => {
        const { queryByTestId } = render(<Components />);
        const logo = queryByTestId("container");
        expect(logo).toBeTruthy();
    })

})