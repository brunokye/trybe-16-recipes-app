import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Recipes from '../pages/Recipes';
import Profile from '../pages/Profile';
import FoodProvider from '../context/FoodProvider';

describe('Verifica o componente Header', () => {
  it('Testa os elementos da tela', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <FoodProvider>
          <Recipes />
        </FoodProvider>
      </MemoryRouter>,
    );

    const title = screen.getByText(/meals/i);
    const search = screen.getByRole('img', { name: /search/i });
    const profile = screen.getByRole('img', { name: /profile/i });

    expect(title).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
  });

  it('Testa o click no botão search', () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <FoodProvider>
          <Recipes />
        </FoodProvider>
      </MemoryRouter>,
    );

    const search = screen.getByRole('img', { name: /search/i });
    userEvent.click(search);

    const searchBar = screen.getByRole('textbox');
    expect(searchBar).toBeInTheDocument();

    userEvent.click(search);
    const hiddenElement = screen.queryByRole('textbox');
    expect(hiddenElement).not.toBeInTheDocument();
  });

  it('Testa fazer uma pesquisa', () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue('teste'),
    });

    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <FoodProvider>
          <Recipes />
        </FoodProvider>
      </MemoryRouter>,
    );

    const searchIcon = screen.getByRole('img', { name: /search/i });
    userEvent.click(searchIcon);

    const searchBar = screen.getByRole('textbox');
    const ingredient = screen.getByText(/ingredient/i);
    const searchButton = screen.getByRole('button', { name: /pesquisar/i });

    userEvent.type(searchBar, 'teste');
    userEvent.click(ingredient);
    userEvent.click(searchButton);

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('Testa páginas sem o botão search', () => {
    render(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <FoodProvider>
          <Profile />
        </FoodProvider>
      </MemoryRouter>,
    );

    const search = screen.queryByRole('img', { name: /search/i });
    expect(search).not.toBeInTheDocument();
  });
});
