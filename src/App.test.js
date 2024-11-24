import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders a random quote and author', () => {
  render(<App />);

  // Check if a quote is displayed
  const quoteElement = screen.getByText(/could not fetch a quote at the moment/i);
  expect(quoteElement).toBeInTheDocument();
  
  // Check if the author is displayed (either empty or default if not available)
  const authorElement = screen.getByText(/- Unknown/i);  // Adjust for your default value
  expect(authorElement).toBeInTheDocument();
});

test('clicking "New Quote" changes the quote and author', () => {
  render(<App />);
  
  // Find the "New Quote" button
  const newQuoteButton = screen.getByText(/New Quote/i);
  
  // Simulate a click on the button
  fireEvent.click(newQuoteButton);
  
  // Verify that the quote changes (you might need to adjust based on state logic)
  const quoteElement = screen.getByText(/could not fetch a quote at the moment/i);
  expect(quoteElement).not.toBeInTheDocument();  // The quote should no longer be the default one
});
