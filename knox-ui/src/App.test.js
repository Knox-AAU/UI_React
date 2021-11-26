import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Search Contents/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders ChatBot', () => {
  const result = render(<App />);
  const rsc = result.container.querySelector(".rsc");
  expect(rsc).toBeTruthy()
});
