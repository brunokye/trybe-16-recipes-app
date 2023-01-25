import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import DrinksContext from './DrinksContext';

function DrinksProvider({ children }) {
  // TODO: Fetch the data from the API
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {}, []);

  const contextValue = useMemo(() => ({
    drinks,
    setDrinks,
  }), [drinks]);

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
