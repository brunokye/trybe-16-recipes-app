import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';

export default function Recipes() {
  const location = useLocation();
  const pathname = location.pathname === '/meals' ? 'Meals' : 'Drinks';

  return (
    <div>
      <Header
        title={ pathname }
        searchEnabled
      />
      <h1>Recipes</h1>
    </div>
  );
}
