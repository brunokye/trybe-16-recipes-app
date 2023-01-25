import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import FoodContext from './FoodContext';

function FoodProvider({ children }) {
  // TODO: Fetch the data from the API
  const [foods, setFoods] = useState([]);

  useEffect(() => {}, []);

  const contextValue = useMemo(() => ({
    foods,
    setFoods,
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
