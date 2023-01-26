import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import FoodContext from './FoodContext';
import { fetchMeals, fetchMealsCategories } from '../services/mealAPI';

function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchMeals();
      setFoods(response);
      const responseCategories = await fetchMealsCategories();
      setFoodCategories(responseCategories);
    };
    fetch();
  }, []);

  const contextValue = useMemo(() => ({
    recipes: foods,
    categories: foodCategories,
  }), [foods, foodCategories]);

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
