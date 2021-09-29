import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';

export default function renderWithRouter(componentToRender) {
  const customHistory = createMemoryHistory();

  return {
    ...render(
      <Router history={ customHistory }>
        {componentToRender}
      </Router>,
    ),
    history: customHistory,
  };
}
