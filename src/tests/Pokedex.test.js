import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Pokedex.js tests', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const pokedexTextH2 = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(pokedexTextH2).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão', () => {
    renderWithRouter(<App />);
    const buttonNextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });

    userEvent.click(buttonNextPokemon);
    const charmander = screen.getByText('Charmander');
    expect(charmander).toBeInTheDocument();

    userEvent.click(buttonNextPokemon);
    const caterpie = screen.getByText('Caterpie');
    expect(caterpie).toBeInTheDocument();

    userEvent.click(buttonNextPokemon);
    userEvent.click(buttonNextPokemon);
    userEvent.click(buttonNextPokemon);
    userEvent.click(buttonNextPokemon);
    userEvent.click(buttonNextPokemon);
    userEvent.click(buttonNextPokemon);
    userEvent.click(buttonNextPokemon);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();

    const buttonPoison = screen.getByRole('button', { name: 'Poison' });
    expect(buttonPoison).toBeInTheDocument();
    userEvent.click(buttonPoison);

    const ekans = screen.getByText('Ekans');
    expect(ekans).toBeInTheDocument();

    const allButtunsType = screen.getAllByTestId('pokemon-type-button');
    const SEVEN = 7;
    expect(allButtunsType.length).toBe(SEVEN);

    const buttonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(buttonAll);

    expect(pikachu).toBeInTheDocument();
  });
});
