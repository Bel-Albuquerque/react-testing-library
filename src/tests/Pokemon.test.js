import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';

const textLink = 'More details';

describe('Pokemon.js tests', () => {
  test(`Teste se é renderizado um card com as informações de
  determinado pokémon.`, () => {
    renderWithRouter(<App />);

    const pikachu = pokemons[0];
    const pikachuName = screen.getByText(pikachu.name);
    expect(pikachuName).toBeInTheDocument();

    const pikachuWeight = screen.getByText(
      `Average weight: ${pikachu.averageWeight.value} kg`,
    );
    expect(pikachuWeight).toBeInTheDocument();

    const linkDetails = screen.getByRole('link', { name: textLink });
    expect(linkDetails).toBeInTheDocument();

    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(pikachu.type);

    const imagePikachu = screen.getByRole('img');
    expect(imagePikachu).toHaveAttribute('src', pikachu.image);
    expect(imagePikachu).toHaveAttribute('alt', `${pikachu.name} sprite`);
  });

  test(`Teste se o card do Pokémon indicado na Pokédex contém um link de 
  navegação para exibir detalhes deste Pokémon. O link deve possuir a URL 
  /pokemons/<id>, onde <id> é o id do Pokémon exibido`, () => {
    const { history } = renderWithRouter(<App />);
    const pikachu = pokemons[0];

    const linkDetails = screen.getByRole('link', { name: textLink });
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pikachu.id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const pikachu = pokemons[0];

    const linkDetails = screen.getByRole('link', { name: textLink });
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe(`/pokemons/${pikachu.id}`);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);

    const favoriteImage = screen.getAllByRole('img')[1];
    expect(favoriteImage).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteImage).toHaveAttribute('alt', `${pikachu.name} is marked as favorite`);
  });
});
