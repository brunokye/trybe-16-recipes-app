import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import DrinksContext from './DrinksContext';
import { fetchDrinks, fetchDrinksCategories } from '../services/cockTailAPI';

function DrinksProvider({ children }) {
  const [drinks, setDrinks] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchDrinks();
      setDrinks(response);
      const responseCategories = await fetchDrinksCategories();
      setDrinkCategories(responseCategories);
    };
    fetch();
  }, []);

  const contextValue = useMemo(() => ({
    recipes: drinks,
    categories: drinkCategories,
  }), [drinks, drinkCategories]);

  return (
    <DrinksContext.Provider value={ contextValue }>
      { children }
    </DrinksContext.Provider>
  );
}

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DrinksProvider;
