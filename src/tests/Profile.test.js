import { screen } from '@testing-library/react';
import Profile from '../pages/Profile';
import { renderWithRouter } from './helpers/renderWith';

const setLocalStorage = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

describe('Verifica a Tela de Profile:', () => {
  it('1 - Testa os elementos da tela.', () => {
    renderWithRouter(<Profile />);

    const userEmail = 'email';
    const userData = 'teste@gmail.com';

    setLocalStorage(userEmail, userData);
    expect(localStorage.getItem(userEmail)).toEqual(JSON.stringify(userData));

    const doneRecipes = screen.getByRole('button', { name: /done recipes/i });
    const favoriteRecipes = screen.getByRole('button', { name: /favorite recipes/i });
    const logout = screen.getByRole('button', { name: /logout/i });

    expect(doneRecipes).toBeInTheDocument();
    expect(favoriteRecipes).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
  });
});
