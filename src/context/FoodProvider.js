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
  const [mealsSelected, setMealsSelected] = useState([]);
  const [mealsSelectedLength, setMealsSelectedLength] = useState(null);
  const [ok, setOk] = useState(false);

  const [searchInputValueM, setSearchInputValueM] = useState('');
  const [radioValueM, setRadioValueM] = useState(null);

  const history = useHistory();

  useEffect(() => {
    const fetchApi = async () => {
      if (history.location.pathname === '/meals') {
        const data = (await fetchApiMeals(radioValueM, searchInputValueM));

        if (data) {
          if (data.meals === null) {
            return global
              .alert('Sorry, we haven\'t found any recipes for these filters.');
          }

          const { idMeal } = data.meals.find((item) => item.idMeal);

          setMealsSelected(data);
          setMealsSelectedLength(data.meals.length);

          if (data.meals.length === 1) {
            history.push(`/meals/${idMeal}`);
          }
        }
      }

      setOk(!ok);
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
    mealsSelectedLength,
  }), [ok]);

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
