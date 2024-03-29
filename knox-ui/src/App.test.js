import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react'

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Search Contents/i);
  expect(linkElement).toBeInTheDocument();
});

//Test that the chatbot renders
//No other test for the element, as it is expected that the chatbox is already tested
/* Test failing since chatbot is disabled (See VertualAssistant.js for more info)
test('renders ChatBot', () => {
  const result = render(<App />);
  const rsc = result.container.querySelector(".rsc");
  expect(rsc).toBeTruthy()
});
*/
