import { render } from '@testing-library/react';
import Components from "../FactChecker";

// Tests for the header div component 
describe("Header component", () => {

    test("Rendered header div", () => {
        const { queryByTestId } = render(<Components />);
        const header = queryByTestId("headerDiv");
        expect(header).toBeTruthy();
    })
})

