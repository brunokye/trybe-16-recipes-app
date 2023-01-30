import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { require } from 'clipboard-copy';

import shareIcon from '../images/shareIcon.svg';
import whiteIcon from '../images/whiteHeartIcon.svg';
// import blackIcon from '../images/blackHeartIcon.svg';

export default function MealDetails({ result, recipeId }) {
  const [ingredients, setIngredients] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube } = result;

  const mockDone = [{
    id: '102030',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  }];

  const mockInProgress = {
    drinks: {
      102030: [''],
    },
    meals: {
      201020: [''],
    },
  };

  localStorage.setItem('doneRecipes', JSON.stringify(mockDone));
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const idDone = doneRecipes.some(({ id }) => id === recipeId);

  localStorage.setItem('inProgressRecipes', JSON.stringify(mockInProgress));
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const inProgressMeals = Object.keys(inProgressRecipes.meals);
  const idInProgress = inProgressMeals.includes(recipeId);

  useEffect(() => {
    const maxIngredient = 20;
    const ingredientList = [];

    if (result) {
      for (let i = 1; i <= maxIngredient; i += 1) {
        if (result[`strIngredient${i}`]) {
          ingredientList.push(
            {
              ingredient: result[`strIngredient${i}`],
              measure: result[`strMeasure${i}`],
            },
          );
        }
      }
    }

    setIngredients(ingredientList);
  }, [result]);

  const copyToClipboard = (id) => {
    const copy = require('clipboard-copy');
    const url = `http://localhost:3000/meals/${id}`;
    copy(url);
    setCopyLink(true);
  };

  if (ingredients.length === 0) return <div>Loading...</div>;
  return (
    <div className="recipe-container">
      <div>
        <button
          data-testid="share-btn"
          type="button"
          onClick={ () => copyToClipboard(recipeId) }
        >
          <img
            src={ shareIcon }
            alt="share"
          />
        </button>

        <button
          data-testid="favorite-btn"
          type="button"
        >
          <img
            src={ whiteIcon }
            alt="share"
          />
        </button>

        <div>
          { copyLink && (
            <span>Link copied!</span>
          ) }
        </div>
      </div>

      <img
        data-testid="recipe-photo"
        className="img-size"
        src={ strMealThumb }
        alt={ strMeal }
      />

      <h2 data-testid="recipe-title">{ strMeal }</h2>
      <h3 data-testid="recipe-category">{ strCategory }</h3>
      <ul>
        {ingredients.map(({ ingredient, measure }, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {ingredient}
            {' '}
            -
            {' '}
            {measure}
          </li>
        ))}
      </ul>

      <p data-testid="instructions">{ strInstructions }</p>

      <iframe
        data-testid="video"
        width="560"
        height="315"
        src={ strYoutube.replace('watch?v=', 'embed/') }
        title={ strMeal }
        allowFullScreen
      />

      { idDone ? '' : (
        <Link to={ `/meals/${recipeId}/in-progress` }>
          <button
            data-testid="start-recipe-btn"
            className="start-button"
            type="button"
          >
            { idInProgress ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        </Link>
      )}
    </div>
  );
}

MealDetails.propTypes = {}.isRequired;
