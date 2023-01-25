import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';

import Footer from '../components/Footer';
import Recipes from '../pages/Recipes';
import Profile from '../pages/Profile';
import Login from '../pages/Login';
import DoneRecipes from '../pages/DoneRecipes';
import Favorites from '../pages/Favorites';

describe('test the footer component', () => {
  test('if the footer and its icons exist on the screen', () => {
    renderWithRouter(<Footer />);

    const footer = screen.getByTestId('footer');
    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    const mealsBtn = screen.getByTestId('meals-bottom-btn');

    expect(footer).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
  });

  test('if the drinks button redirects to the drinks page', async () => {
    const { history } = renderWithRouter(<Footer />);

    const drinkBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkBtn);

    expect(history.location.pathname).toBe('/drinks');
  });

  test('if the meals button redirects to the meals page', () => {
    const { history } = renderWithRouter(<Footer />);

    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsBtn);

    expect(history.location.pathname).toBe('/meals');
  });

  test('if when loading the recipes page the footer is rendered', () => {
    renderWithRouter(<Recipes />);

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  test('if when loading the profile page the footer is rendered', () => {
    renderWithRouter(<Profile />);

    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  test('if when loading the profile page the login is NOT rendered', () => {
    renderWithRouter(<Login />);

    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  test('if when loading the done recipes page the login is NOT rendered', () => {
    renderWithRouter(<DoneRecipes />);

    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });

  test('if when loading the favorites recipes page the login is NOT rendered', () => {
    renderWithRouter(<Favorites />);

    const footer = screen.queryByTestId('footer');
    expect(footer).not.toBeInTheDocument();
  });
});
