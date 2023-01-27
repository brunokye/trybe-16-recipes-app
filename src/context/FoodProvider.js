import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import FoodContext from './FoodContext';
import {
  fetchMeals,
  fetchMealsCategories,
  fetchMealsByCategory,
} from '../services/mealAPI';

function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const responseCategories = await fetchMealsCategories();
      setFoodCategories(responseCategories);
      if (categoryFilter === '') {
        const response = await fetchMeals();
        setFoods(response);
        return;
      }
      const response = await fetchMealsByCategory(categoryFilter);
      setFoods(response);
    };
    fetch();
  }, [categoryFilter]);

  const contextValue = useMemo(() => ({
    recipes: foods,
    categories: foodCategories,
    categoryFilter,
    setCategoryFilter,
  }), [foods, foodCategories, categoryFilter]);

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
