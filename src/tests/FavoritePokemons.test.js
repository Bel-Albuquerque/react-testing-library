import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import {
  readFavoritePokemonIds,
} from '../services/pokedexService';

describe('FavoritePokemons.js tests', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found, se a pessoa não tiver pokémons favoritos.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/favorites');

    const noFavorite = screen.getByText('No favorite pokemon found');

    readFavoritePokemonIds();

    expect(noFavorite).toBeInTheDocument();
  });


});
