import { render } from '@testing-library/react';
import Components from "../Status";
import React from 'react'

// Tests for the group specific div components 
describe("GroupDiv component", () => {

    test("Rendered nordjyske div", () => {
        const { queryByTestId } = render(<Components />);
        const nordjysk = queryByTestId("nordjyskDiv");
        expect(nordjysk).toBeTruthy();
    })

    test("Rendered database div", () => {
        const { queryByTestId } = render(<Components />);
        const database = queryByTestId("databaseDiv");
        expect(database).toBeTruthy();
    })
})

