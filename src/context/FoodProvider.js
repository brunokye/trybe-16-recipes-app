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
  const [clickOk, setClickOk] = useState(false);
  const [mealsSelected, setMealsSelected] = useState([]);
  const [drinksSelected, setDrinksSelected] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [radioValue, setRadioValue] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const fetchApi = async () => {
      if (history.location.pathname === '/meals') {
        const data = await fetchApiMeals(radioValue, searchInputValue);
        setMealsSelected(data);
      }

      if (history.location.pathname === '/drinks') {
        const data = await fetchApiCockTail(radioValue, searchInputValue);
        setDrinksSelected(data);
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
