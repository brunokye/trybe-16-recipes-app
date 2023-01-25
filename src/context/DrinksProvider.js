import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import DrinksContext from './DrinksContext';

function DrinksProvider({ children }) {
  // TODO: Fetch the data from the API
  const [food, setFood] = useState([]);

  useEffect(() => {}, []);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {
    food,
    setFood,
  };
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
