import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndProviders } from './helpers/renderWith';
import Recipes from '../pages/Recipes';
import { foodResponse, drinksResponse, foodCategoriesResponse, drinksCategoriesResponse } from './mocks';

const getAllFoodsPath = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const getAllDrinksPath = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const getFoodCategoriesPath = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const getDrinkCategoriesPath = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const responseByPath = {
  [getAllFoodsPath]: foodResponse,
  [getAllDrinksPath]: drinksResponse,
  [getFoodCategoriesPath]: foodCategoriesResponse,
  [getDrinkCategoriesPath]: drinksCategoriesResponse,
};

describe('Tela de Principal de Receitas', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch')
      .mockImplementation((param) => ({
        json: async () => responseByPath[param],
      }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Verfica se ao estar na tela de receitas com o pathname = "/meals", são renderizados apenas 12 cards de receitas de comida.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/meals'] }));

    const meals = await screen.findAllByTestId(/^\d+-recipe-card$/i);
    expect(meals).toHaveLength(12);
  });

  it('Verfica se ao estar na tela de receitas com o pathname = "/meals", são renderizados apenas 5 categorias em formato de botões.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/meals'] }));

    const mealCategories = await screen.findAllByTestId(/^.*-category-filter$/i);
    expect(mealCategories).toHaveLength(5);
  });

  it('Verfica se ao estar na tela de receitas com o pathname = "/drinks", são renderizados 12 cards de receitas de bebidas.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/drinks'] }));

    const drinks = await screen.findAllByTestId(/^\d+-recipe-card$/i);
    expect(drinks).toHaveLength(12);
  });

  it('Verfica se ao estar na tela de receitas com o pathname = "/drinks", são renderizados apenas 5 categorias em formato de botões.', async () => {
    await act(async () => renderWithRouterAndProviders(<Recipes />, { initialEntries: ['/drinks'] }));

    const drinkCategories = await screen.findAllByTestId(/^.*-category-filter$/i);
    expect(drinkCategories).toHaveLength(5);
  });

  it('', () => {});
  it('', () => {});
});
