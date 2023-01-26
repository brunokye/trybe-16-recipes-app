/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchApiCockTail } from '../services/cockTailAPI';
import { fetchApiMeals } from '../services/mealAPI';
import FoodContext from './FoodContext';

function FoodProvider({ children }) {
  // TODO: Fetch the data from the API
  const [foods, setFoods] = useState([]);
  const [clickOk, setClickOk] = useState(true);
  const [mealsSelected, setMealsSelected] = useState();
  const [drinksSelected, setDrinksSelected] = useState();
  const [searchInputValue, setSearchInputValue] = useState('');
  const [radioValue, setRadioValue] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const fetchApi = async () => {
      if (history.location.pathname === '/meals') {
        const data = (await fetchApiMeals(radioValue, searchInputValue));
        const { idMeal } = data.meals.find((item) => item.idMeal);
        setMealsSelected(data);

        if (data.meals.length === 1) {
          console.log('history');
          history.push(`/meals/${idMeal}`);
        }
      }

      if (history.location.pathname === '/drinks') {
        const data = await fetchApiCockTail(radioValue, searchInputValue);

        const { idDrink } = data.drinks.find((item) => item.idDrink);
        setDrinksSelected(data);

        if (data.meals.length === 1) {
          history.push(`/drinks/${idDrink}`);
        }
      }
    };

    fetchApi();
  }, [clickOk]);

  const contextValue = useMemo(() => ({
    foods,
    setFoods,
    searchInputValue,
    setSearchInputValue,
    setClickOk,
    clickOk,
    radioValue,
    setRadioValue,
    mealsSelected,
    drinksSelected,
  }), [foods]);

  return (
    <FoodContext.Provider value={ contextValue }>
      { children }
    </FoodContext.Provider>
  );
}

FoodProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodProvider;
