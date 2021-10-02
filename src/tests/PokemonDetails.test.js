import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';

const caminhoPikachu = 'pokemons/25';

describe('Pokemon.js tests', () => {
  test(`Teste se as informações detalhadas do Pokémon selecionado
  são mostradas na tela.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(caminhoPikachu);

    const pikachu = pokemons[0];

    const titleDetailsPage = screen.getByRole('heading', {
      level: 2,
      name: `${pikachu.name} Details`,
    });
    expect(titleDetailsPage).toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summary).toBeInTheDocument();

    const summaryText = screen.getByText(pikachu.summary);
    expect(summaryText).toBeInTheDocument();
  });

  test(`Teste se existe na página uma seção com os mapas contendo
  as localizações do pokémon`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(caminhoPikachu);

    const pikachu = pokemons[0];

    const titleMapLocations = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pikachu.name}`,
    });
    expect(titleMapLocations).toBeInTheDocument();

    const mapImages = screen.getAllByAltText('Pikachu location');
    expect(mapImages.length).toBe(pikachu.foundAt.length);
    expect(mapImages[0]).toHaveAttribute('src', pikachu.foundAt[0].map);
    expect(mapImages[1]).toHaveAttribute('src', pikachu.foundAt[1].map);
  });

  test(`Teste se o usuário pode favoritar um pokémon através da página de 
  detalhes.`, () => {
    const { history } = renderWithRouter(<App />);
    history.push(caminhoPikachu);

    const pokemonFvoritado = screen.getByLabelText('Pokémon favoritado?');
    expect(pokemonFvoritado).toBeInTheDocument();
    userEvent.click(pokemonFvoritado);
    const checkbox = screen.getByRole('checkbox', { checked: true });
    expect(checkbox).toBeInTheDocument();
  });
});
