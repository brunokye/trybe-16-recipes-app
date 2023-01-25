import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';

import App from '../App';

const TEST_EMAIL = 'teste@teste.com';
const TEST_PASSWORD = '123456';

describe('test the footer component', () => {
  test('if the footer and its icons exist on the screen', () => {
    render(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, TEST_EMAIL);
    userEvent.type(inputPassword, TEST_PASSWORD);
    userEvent.click(btnLogin);

    const footer = screen.getByTestId('footer');
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    const mealsBtn = screen.getByTestId('meals-bottom-btn');

    expect(footer).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
  });

  test('if the drinks button redirects to the drinks page', () => {
    render(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, TEST_EMAIL);
    userEvent.type(inputPassword, TEST_PASSWORD);
    userEvent.click(btnLogin);

    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkBtn);

    expect(window.location.pathname).toBe('/drinks');
  });

  test('if the meals button redirects to the meals page', () => {
    render(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const btnLogin = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, TEST_EMAIL);
    userEvent.type(inputPassword, TEST_PASSWORD);
    userEvent.click(btnLogin);

    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsBtn);

    expect(window.location.pathname).toBe('/meals');
  });
});
