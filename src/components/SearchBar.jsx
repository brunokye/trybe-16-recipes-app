import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FoodContext from '../context/FoodContext';
import { fetchApiMeals } from '../services/mealAPI';

export default function SearchBar() {
  const { searchInputValue } = useContext(FoodContext);
  const [radioValue, setRadioValue] = useState(null);
  const history = useHistory();

  const handleClickRadio = ({ target }) => {
    setRadioValue(target.id);
    console.log(target.id);
    console.log(searchInputValue);
  };

  const handleClickButton = async () => {
    if (history.location.pathname === '/meals') {
      const data = await fetchApiMeals(radioValue);
      console.log(data);
    }
  };

  return (
    <div>
      <label htmlFor="ingredient">
        {' '}
        Ingredient
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="radio"
          onClick={ handleClickRadio }
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
          onClick={ handleClickRadio }
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
          onClick={ handleClickRadio }
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClickButton }
      >
        Pesquisar
      </button>

    </div>
  );
}
