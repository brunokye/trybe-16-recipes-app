import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import FoodContext from './FoodContext';

function FoodProvider({ children }) {
  // TODO: Fetch the data from the API
  const [food, setFood] = useState([]);

  useEffect(() => {}, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    food,
    setFood,
  };
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
