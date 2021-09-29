import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './utils/renderWithRouter';

describe('NotFound.js tests', () => {
  test('Teste se a página contém a seguinte imagem: https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const image = screen.getAllByRole('img')[1];

    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });

  test(`Teste se página contém um heading h2 com o texto 
  Page requested not found`, () => {
    renderWithRouter(<NotFound />);

    const NotFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(NotFoundText).toBeInTheDocument();
  });
});
