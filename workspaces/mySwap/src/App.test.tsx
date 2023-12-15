import React from 'react';
import { render, screen } from '@testing-library/react';
import { compose } from 'ramda';
import App from './App';

test('renders learn react link', () => {
  const renderAppAndCheckHeader = compose(
    (headerElement: any) => expect(headerElement).toBeInTheDocument(),
    () => screen.getByText(/MySwap/i),
    () => render(<App />)
  );

  renderAppAndCheckHeader();
});

test('renders App component', () => {
  render(<App />);
  const linkElement = screen.getByText(/MySwap/i);
  expect(linkElement).toBeInTheDocument();
});
