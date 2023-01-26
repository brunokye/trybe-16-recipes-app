import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import FoodContext from './FoodContext';
import { fetchMeals } from '../services/mealAPI';

function FoodProvider({ children }) {
  const [foods, setFoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchMeals();
      setFoods(response);
    };
    setIsLoading(true);
    fetch();
    setIsLoading(false);
  }, []);

  const contextValue = useMemo(() => ({
    foods,
    setFoods,
    isLoading,
  }), [foods, isLoading]);

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
