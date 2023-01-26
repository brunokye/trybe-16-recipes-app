/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchApiMeals } from '../services/mealAPI';
import FoodContext from './FoodContext';

function FoodProvider({ children }) {
  // TODO: Fetch the data from the API
  const [foods, setFoods] = useState([]);
  const [clickOk, setClickOk] = useState(false);
  const [mealsSelected, setMealsSelected] = useState([]);
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
        const data = await fetchApiMeals(radioValue, searchInputValue);
        setMealsSelected(data);
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
