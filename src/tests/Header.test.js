import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Recipes from '../pages/Recipes';
import Profile from '../pages/Profile';

describe('Verifica o componente Header:', () => {
  it('1 - Testa os elementos da tela.', () => {
    render(
      <MemoryRouter initialEntries={ ['/meals'] }>
        <Recipes />
      </MemoryRouter>,
    );

    const title = screen.getByText(/meals/i);
    const search = screen.getByRole('img', { name: /search/i });
    const profile = screen.getByRole('img', { name: /profile/i });

    expect(title).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
  });

  it('2 - Testa o click no botão search.', () => {
    render(
      <MemoryRouter initialEntries={ ['/drinks'] }>
        <Recipes />
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

  it('3 - Testa páginas sem o botão search.', () => {
    render(
      <MemoryRouter initialEntries={ ['/profile'] }>
        <Profile />
      </MemoryRouter>,
    );

    const search = screen.queryByRole('img', { name: /search/i });
    expect(search).not.toBeInTheDocument();
  });
});
