import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import FoodContext from '../context/FoodContext';

export default function SearchBar() {
  const { setRadioValue,
    setClickOk, clickOk } = useContext(FoodContext);

  const history = useHistory();

  const handleClickRadio = ({ target }) => {
    setRadioValue(target.id);
  };

  const handleClickButton = async () => {
    setClickOk(!clickOk);
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
