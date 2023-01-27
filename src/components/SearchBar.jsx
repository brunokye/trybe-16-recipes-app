import { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

import DrinksContext from '../context/DrinksContext';
import FoodContext from '../context/FoodContext';

export default function SearchBar() {
  const location = useLocation();
  const isFood = location.pathname === '/meals';
  const context = isFood ? FoodContext : DrinksContext;

  const {
    searchInput,
    searchType,
    setSearchInput,
    setSearchType,
  } = useContext(context);

  const [text, setText] = useState(searchInput);
  const [radio, setRadio] = useState(searchType);

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        onChange={ ({ target: { value } }) => setText(value) }
        value={ text }
      />
      <div>
        <label htmlFor="ingredient">
          {' '}
          Ingredient
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            id="ingredient"
            name="radio"
            selected={ radio === 'ingredient' }
            onClick={ () => setRadio('ingredient') }
          />
        </label>

        <label htmlFor="name">
          {' '}
          Name
          <input
            type="radio"
            data-testid="name-search-radio"
            id="name"
            name="radio"
            selected={ radio === 'name' }
            onClick={ () => setRadio('name') }
          />
        </label>

        <label htmlFor="first-letter">
          {' '}
          First Letter
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            id="first-letter"
            name="radio"
            selected={ radio === 'first-letter' }
            onClick={ () => setRadio('first-letter') }
          />
        </label>

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => {
            setSearchType(radio);
            setSearchInput(text);
          } }
        >
          Pesquisar
        </button>
      </div>
    </div>
  );
}
