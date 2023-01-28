import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

export default function DrinkDetails({ result, recipeId }) {
  const [ingredients, setIngredients] = useState([]);
  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = result;

  const mockDone = [{
    id: '201020',
    type: 'drink',
    nationality: 'nacionalidade',
    category: 'categoria',
    alcoholicOrNot: 'alcoholic',
    name: 'nome-da-receita',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
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
  const inProgressDrinks = Object.keys(inProgressRecipes.drinks);
  const idInProgress = inProgressDrinks.includes(recipeId);

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

  if (ingredients.length === 0) return <div>Loading...</div>;
  return (
    <div className="recipe-container">
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

      { idDone ? '' : (
        <Link to={ `/drinks/${recipeId}/in-progress` }>
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

DrinkDetails.propTypes = {}.isRequired;
