import { render } from '@testing-library/react';
import Components from "../AdvancedSideBar";
import React from 'react'

// Tests for the AdvancedSideBar components 
describe("Components in AdvancedSideBar", () => {

    test("Rendered card", () => {
        const { queryByTestId } = render(<Components />);
        const card = queryByTestId("card");
        expect(card).toBeTruthy();
    })

    // Tilføj test af input inde i card

})