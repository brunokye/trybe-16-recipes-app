import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Verifica o componente Header:', () => {
  it('1 - Testa os elementos da tela.', () => {
    render(<Header title="Teste" searchEnabled />);

    const title = screen.getByText(/teste/i);
    const search = screen.getByRole('img', { name: /search/i });
    const profile = screen.getByRole('img', { name: /profile/i });

    expect(title).toBeInTheDocument();
    expect(search).toBeInTheDocument();
    expect(profile).toBeInTheDocument();
  });
});
