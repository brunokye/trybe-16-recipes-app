import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/RecipeCard.css';

export default function RecipeCard({ recipe, index, id, basePath }) {
  const { strMeal, strDrink, strMealThumb, strDrinkThumb } = recipe;

  return (
    <Link
      to={ `${basePath}/${id}` }
    >
      <div className="card" data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ strMealThumb || strDrinkThumb }
          alt="recipe"
          className="cardImg"
        />
        <h3 data-testid={ `${index}-card-name` }>{strMeal || strDrink}</h3>
      </div>
    </Link>
  );
}

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  basePath: PropTypes.string.isRequired,
};
