/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchApiCockTail } from '../services/cockTailAPI';
import DrinksContext from './DrinksContext';

function DrinksProvider({ children }) {
  // TODO: Fetch the data from the API
  const [drinks, setDrinks] = useState([]);
  const [clickOkD, setClickOkD] = useState(true);
  const [drinksSelected, setDrinksSelected] = useState();

  const [searchInputValueD, setSearchInputValueD] = useState('');
  const [radioValueD, setRadioValueD] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const fetchApi = async () => {
      if (history.location.pathname === '/drinks') {
        const data = await fetchApiCockTail(radioValueD, searchInputValueD);

        if (data) {
          console.log(data);
          const { idDrink } = data.drinks.find((item) => item.idDrink);

          setDrinksSelected(data);

          if (data.drinks.length === 1) {
            history.push(`/drinks/${idDrink}`);
          }
        }
      }
    };

    fetchApi();
  }, [clickOkD]);

  const contextValue = useMemo(() => ({
    drinks,
    setDrinks,
    drinksSelected,
    setClickOkD,
    setRadioValueD,
    clickOkD,
    setSearchInputValueD,
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
