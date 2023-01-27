import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import DrinksContext from './DrinksContext';
import {
  fetchDrinks,
  fetchDrinksCategories,
  fetchDrinksByCategory,
} from '../services/cockTailAPI';

function DrinksProvider({ children }) {
  const [drinks, setDrinks] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const responseCategories = await fetchDrinksCategories();
      setDrinkCategories(responseCategories);
      if (categoryFilter === '') {
        const response = await fetchDrinks();
        setDrinks(response);
        return;
      }
      const response = await fetchDrinksByCategory(categoryFilter);
      setDrinks(response);
    };
    fetch();
  }, [categoryFilter]);

  const contextValue = useMemo(() => ({
    recipes: drinks,
    categories: drinkCategories,
    categoryFilter,
    setCategoryFilter,
  }), [drinks, drinkCategories, categoryFilter]);

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
