import { useContext } from 'react';
import { Link } from 'react-router-dom';
import FoodContext from '../context/FoodContext';

export default function MealsRender() {
  const { mealsSelected, mealsSelectedLength } = useContext(FoodContext);
  return (
    <div>

      {!mealsSelectedLength && mealsSelected.meals
        ? mealsSelected.meals.map((meal, index) => {
          const card = `${index}-recipe-card`;
          const img = `${index}-card-img`;
          const name = `${index}-card-name`;
          const num = 12;
          if (index < num) {
            return (
              <Link
                to={ `/meals/${meal.idMeal}` }
                key={ meal.idMeal }
                data-testid={ card }
              >
                <img
                  data-testid={ img }
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  width="150"
                />
                <h2 data-testid={ name }>{meal.strMeal}</h2>
              </Link>
            );
          }
          return null;
        }) : mealsSelected.meals.map((meal, index) => {
          const name = `${index}-card-name`;
          const num = 12;
          if (index < num) {
            return (
              <Link
                to={ `/meals/${meal.idMeal}` }
                key={ meal.idMeal }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  width="150"
                />
                <h2 data-testid={ name }>{meal.strMeal}</h2>
              </Link>
            );
          }
          return null;
        })}
    </div>
  );
}
