/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchApiMeals } from '../services/mealAPI';
import FoodContext from './FoodContext';

function FoodProvider({ children }) {
  // TODO: Fetch the data from the API
  const [foods, setFoods] = useState([]);
  const [clickOkM, setClickOkM] = useState(true);
  const [mealsSelected, setMealsSelected] = useState();

  const [searchInputValueM, setSearchInputValueM] = useState('');
  const [radioValueM, setRadioValueM] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const fetchApi = async () => {
      if (history.location.pathname === '/meals') {
        const data = (await fetchApiMeals(radioValueM, searchInputValueM));

        if (data) {
          const { idMeal } = data.meals.find((item) => item.idMeal);

          setMealsSelected(data);

          if (data.meals.length === 1) {
            history.push(`/meals/${idMeal}`);
          }
        }
      }
    };

    fetchApi();
  }, [clickOkM]);

  const contextValue = useMemo(() => ({
    foods,
    setFoods,
    searchInputValueM,
    setSearchInputValueM,
    setClickOkM,
    clickOkM,
    radioValueM,
    setRadioValueM,
    mealsSelected,
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
