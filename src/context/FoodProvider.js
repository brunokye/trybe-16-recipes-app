/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useMemo, useState, useEffect } from 'react';
import FoodContext from './FoodContext';

function FoodProvider({ children }) {
  // TODO: Fetch the data from the API
  const [foods, setFoods] = useState([]);
  // const [mealsSelected, setMealsSelected] = useState([]);
  // const [globalAlert, setGlobalAlert] = useState(null);
  const [searchInputValue, setSearchInputValue] = useState('');

  useEffect(() => {
    console.log(searchInputValue);
  }, [searchInputValue]);

  const contextValue = useMemo(() => ({
    foods,
    setFoods,
    // mealsSelected,
    // setMealsSelected,
    // globalAlert,
    // setGlobalAlert,
    searchInputValue,
    setSearchInputValue,
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
