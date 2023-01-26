import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { combineProviders } from '../../helpers';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      {component}
    </Router>
  );
}

function withRouterAndProvider(component, history, providers) {
  const Providers = combineProviders(...providers);
  return (
    <Router history={ history }>
      <Providers>
        {component}
      </Providers>
    </Router>
  );
}

export function renderWithRouter(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}

export function renderWithRouterAndProviders(
  component,
  {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
    providers = [],
  } = {},
) {
  return {
    ...render(withRouterAndProvider(component, history, providers)),
    history,
  };
}
