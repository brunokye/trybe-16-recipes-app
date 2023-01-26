import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';
import DrinksContext from './DrinksContext';
import { fetchDrinks } from '../services/cockTailAPI';

function DrinksProvider({ children }) {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchDrinks();
      setDrinks(response);
    };
    fetch();
  }, []);

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
