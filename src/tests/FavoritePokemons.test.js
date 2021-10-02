import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import {
  readFavoritePokemonIds,
} from '../services/pokedexService';

describe('FavoritePokemons.js tests', () => {
  test(`Teste se é exibido na tela a mensagem "No favorite pokemon found", 
  se a pessoa não tiver pokémons favoritos.`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/favorites');

    const noFavorite = screen.getByText('No favorite pokemon found');

    readFavoritePokemonIds();

    expect(noFavorite).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const N_POKEMONS_FAVORITADOS = 4;
    history.push('/pokemons/10');

    const pokemonFvoritado = screen.getByLabelText('Pokémon favoritado?');

    userEvent.click(pokemonFvoritado);

    history.push('/pokemons/4');

    userEvent.click(pokemonFvoritado);

    history.push('/pokemons/143');

    userEvent.click(pokemonFvoritado);

    history.push('/pokemons/148');

    userEvent.click(pokemonFvoritado);

    history.push('/favorites');

    const pokemonsName = screen.getAllByTestId('pokemon-name');
    const pokemonsType = screen.getAllByTestId('pokemon-type');
    const pokemonsWeight = screen.getAllByTestId('pokemon-weight');
    expect(pokemonsName.length).toBe(N_POKEMONS_FAVORITADOS);
    expect(pokemonsType.length).toBe(N_POKEMONS_FAVORITADOS);
    expect(pokemonsWeight.length).toBe(N_POKEMONS_FAVORITADOS);
  });
});
