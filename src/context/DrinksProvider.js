/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DrinksContext from './DrinksContext';

function DrinksProvider({ children }) {
  // TODO: Fetch the data from the API
  const [drinks, setDrinks] = useState([]);
  const [clickOk, setClickOk] = useState(true);
  const [drinksSelected, setDrinksSelected] = useState();

  const [searchInputValue, setSearchInputValue] = useState('');
  const [radioValue, setRadioValue] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const fetchApi = async () => {
      if (history.location.pathname === '/drinks') {
        const data = await fetchApiCockTail(radioValue, searchInputValue);
        console.log(data);

        if (data) {
          const { idDrink } = data.drinks.find((item) => item.idDrink);

          setDrinksSelected(data);

          if (data.drinks.length === 1) {
            history.push(`/drinks/${idDrink}`);
          }
        }
      }
    };

    fetchApi();
  }, [clickOk]);

  const contextValue = useMemo(() => ({
    drinks,
    setDrinks,
    drinksSelected,
    setClickOk,
    setRadioValue,
    setSearchInputValue,
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
