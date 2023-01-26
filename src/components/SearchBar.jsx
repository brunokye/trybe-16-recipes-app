import { useContext, useState } from 'react';
import DrinksContext from '../context/DrinksContext';
import FoodContext from '../context/FoodContext';

export default function SearchBar() {
  const { setRadioValueM,
    setClickOkM } = useContext(FoodContext);
  const { setRadioValueD,
    setClickOkD } = useContext(DrinksContext);

  const [click, setClick] = useState(false);

  const handleClickRadio = ({ target }) => {
    setRadioValueM(target.id);
    setRadioValueD(target.id);
  };

  const handleClickButton = () => {
    setClick(!click);

    setClickOkM(click);
    setClickOkD(click);
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
