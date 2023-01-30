import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { require } from 'clipboard-copy';
import useLocalStorage from '../hooks/useLocalStorage';

import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

export default function DrinkDetails({ result }) {
  const [ingredients, setIngredients] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  const history = useHistory();

  const { idDrink, strDrinkThumb, strDrink,
    strAlcoholic, strInstructions, strCategory } = result;

  const newRecipe = {
    id: idDrink,
    type: 'drink',
    nationality: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
  };

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const idDone = doneRecipes?.some(({ id }) => id === idDrink);

  const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const inProgressDrinks = Object.keys(inProgressRecipes?.drinks || {});
  const idInProgress = inProgressDrinks.includes(idDrink);

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
    const url = `http://localhost:3000/drinks/${id}`;
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

  if (idDone) {
    history.push('/done-receipes');
    return;
  }

  if (ingredients.length === 0) return <div>Loading...</div>;
  return (
    <div className="recipe-container">
      <div>
        <button
          type="button"
          onClick={ () => copyToClipboard(idDrink) }
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
        src={ strDrinkThumb }
        alt={ strDrink }
      />

      <h2 data-testid="recipe-title">{ strDrink }</h2>
      <h3 data-testid="recipe-category">{ strAlcoholic }</h3>
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

      <Link to={ `/drinks/${idDrink}/in-progress` }>
        <button
          data-testid="start-recipe-btn"
          className="start-button"
          type="button"
        >
          { idInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      </Link>

    </div>
  );
}

DrinkDetails.propTypes = {}.isRequired;
