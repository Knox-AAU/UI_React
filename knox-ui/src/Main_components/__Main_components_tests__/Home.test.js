import { render } from '@testing-library/react';
import Components from "../Home";

// Tests for the Button component 
describe("Button component", () => {

    test("Rendered button", () => {
        const { queryByTestId } = render(<Components />);
        const button = queryByTestId("advancedButton");
        expect(button).toBeTruthy();
    })
})



