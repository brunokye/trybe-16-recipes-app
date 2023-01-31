import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { require } from 'clipboard-copy';
import useLocalStorage from '../hooks/useLocalStorage';

import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

export default function MealDetails({ result }) {
  const [ingredients, setIngredients] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  const { idMeal, strMealThumb, strMeal, strArea,
    strCategory, strInstructions, strYoutube } = result;

  const newRecipe = {
    id: idMeal,
    type: 'meal',
    nationality: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };

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
  const idDone = doneRecipes.some(({ id }) => id === idMeal);

  localStorage.setItem('inProgressRecipes', JSON.stringify(mockInProgress));
  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const inProgressMeals = Object.keys(inProgressRecipes.meals);
  const idInProgress = inProgressMeals.includes(idMeal);

  useEffect(() => {
    const maxIngredient = 20;
    const ingredientList = [];

    const verifyRecipe = favoriteRecipes.some((recipes) => recipes.id === newRecipe.id);
    if (verifyRecipe) setFavorite(true);

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

  const favoriteRecipe = () => {
    if (favorite === false) {
      setFavoriteRecipes([...favoriteRecipes, newRecipe]);
      return setFavorite(true);
    }

    const removeRecipe = favoriteRecipes.filter((recipes) => recipes.id !== newRecipe.id);
    setFavoriteRecipes([...removeRecipe]);
    return setFavorite(false);
  };

  if (ingredients.length === 0) return <div>Loading...</div>;
  return (
    <div className="recipe-container">
      <div>
        <button
          type="button"
          onClick={ () => copyToClipboard(idMeal) }
        >
          <img
            data-testid="share-btn"
            src={ shareIcon }
            alt="share"
          />
        </button>

        <button
          type="button"
          onClick={ () => favoriteRecipe() }
        >
          <img
            data-testid="favorite-btn"
            src={ favorite ? blackHeart : whiteHeart }
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
        <Link to={ `/meals/${idMeal}/in-progress` }>
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
