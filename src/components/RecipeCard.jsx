import React from 'react';
import PropTypes from 'prop-types';
import '../styles/RecipeCard.css';

export default function RecipeCard({ recipe, index }) {
  const { strMeal, strDrink, strMealThumb, strDrinkThumb } = recipe;

  return (
    <div className="card" data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ strMealThumb || strDrinkThumb }
        alt="recipe"
        className="cardImg"
      />
      <h3 data-testid={ `${index}-card-name` }>{strMeal || strDrink}</h3>
    </div>
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
};
