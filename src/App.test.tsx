import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders basic App', () => {
  render(<App />);
  const linkElement = screen.getByText(/App/i);
  expect(linkElement).toBeInTheDocument();
});
