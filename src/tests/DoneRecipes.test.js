import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/renderWith';

import DoneRecipes from '../pages/DoneRecipes';

const setLocalStorage = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

const doneRecipesData = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

const key = 'doneRecipes';
const data = doneRecipesData;

describe('Verifica tela de Receitas Feitas', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('Testa se os elementos aparecem corretamente na tela', () => {
    renderWithRouter(<DoneRecipes />);

    setLocalStorage(key, data);
    expect(localStorage.getItem(key)).toEqual(JSON.stringify(data));

    const filterAll = screen.getByTestId('filter-by-all-btn');
    const filterMeals = screen.getByTestId('filter-by-meal-btn');
    const filterDrinks = screen.getByTestId('filter-by-drink-btn');
    expect(filterAll).toBeInTheDocument();
    expect(filterMeals).toBeInTheDocument();
    expect(filterDrinks).toBeInTheDocument();

    const cards = screen.getAllByTitle('card');
    expect(cards.length).toEqual(2);
  });
});
