import React from 'react';
import PropTypes from 'prop-types';

export default function Recommendations({ recipes }) {
  // const [notShow, setNotShow] = useState(true);
  const SIX = 6;

  return (
    <>
      {recipes.slice(0, SIX).map((recipe, index) => (
        <div
          key={ recipe.strMeal || recipe.strDrink }
          className="image-container"
        >
          <img
            data-testid={ `${index}-recommendation-card` }
            className="image-size"
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
          />
          <span
            data-testid={ `${index}-recommendation-title` }
            className="text-container"
          >
            {recipe.strMeal || recipe.strDrink }
          </span>
        </div>
      ))}
    </>
  );
}

Recommendations.propTypes = {
  recipes: PropTypes.array,
}.isRequired;
