import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation();
  const path = location.pathname;
  const pathArray = path.split('/');

  const [meals, setMeals] = React.useState([]);
  const [drinks, setDrinks] = React.useState([]);

  useEffect(() => {
    if (pathArray[1] === 'meals') {
      const fetchByID = async () => {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const data = await response.json();
        setMeals(data.meals[0]);
      };
      fetchByID();
    } else {
      const fetchByID = async () => {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
        );
        const data = await response.json();
        setDrinks(data.drinks[0]);
      };
      fetchByID();
    }
  }, [id]);

  const maxIngredientsMeals = 20;
  const maxIngredientsDrinks = 15;

  const callIngredients = () => {
    const ingredients = [];
    if (pathArray[1] === 'meals') {
      for (let i = 1; i <= maxIngredientsMeals; i += 1) {
        if (meals[`strIngredient${i}`]) {
          ingredients.push(
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              <label htmlFor={ i } data-testid={ `${i}-ingredient-step` }>
                <input type="checkbox" id={ i } />
                {meals[`strIngredient${i}`]}
                {' '}
                -
                {' '}
                {meals[`strMeasure${i}`]}
              </label>
            </li>,
          );
        }
      }
    }
    if (pathArray[1] === 'drinks') {
      for (let i = 1; i <= maxIngredientsDrinks; i += 1) {
        if (drinks[`strIngredient${i}`]) {
          ingredients.push(
            <li
              key={ i }
              data-testid={ `${i}-ingredient-name-and-measure` }
            >
              <label htmlFor={ i } data-testid={ `${i}-ingredient-step` }>
                <input type="checkbox" id={ i } />
                {drinks[`strIngredient${i}`]}
                {' '}
                -
                {' '}
                {drinks[`strMeasure${i}`]}
              </label>
            </li>,
          );
        }
      }
    }
    return ingredients;
  };

  return (
    <div>
      <h1>Recepies in Progress</h1>
      {meals.length === 0 ? null : (
        <div>
          <h3 data-testid="recipe-title">{meals.strMeal}</h3>
          <img
            data-testid="recipe-photo"
            src={ meals.strMealThumb }
            alt={ meals.strMeal }
          />
          <div>
            <button type="button" data-testid="share-btn">
              Share
            </button>
            <button type="button" data-testid="favorite-btn">
              Favorite
            </button>
            <button type="button" data-testid="finish-recipe-btn">
              Finish Recipe
            </button>
          </div>
          <p data-testid="recipe-category">
            Category:
            {' '}
            {meals.strCategory}
          </p>
          <h5>Ingredients:</h5>
          <ul>
            {
              callIngredients()
            }
          </ul>
          <h5>Instructions:</h5>
          <p data-testid="instructions">{meals.strInstructions}</p>
        </div>
      )}
      {drinks.length === 0 ? null : (
        <div>
          <h3 data-testid="recipe-title">{drinks.strDrink}</h3>
          <img
            data-testid="recipe-photo"
            src={ drinks.strDrinkThumb }
            alt={ drinks.strDrink }
          />
          <div>
            <button type="button" data-testid="share-btn">
              Share
            </button>
            <button type="button" data-testid="favorite-btn">
              Favorite
            </button>
            <button type="button" data-testid="finish-recipe-btn">
              Finish Recipe
            </button>
          </div>
          <p data-testid="recipe-category">
            {drinks.strAlcoholic}
          </p>
          <h5>Ingredients:</h5>
          <ul>
            {
              callIngredients()
            }
          </ul>
          <h5>Instructions:</h5>
          <p data-testid="instructions">{drinks.strInstructions}</p>
        </div>
      )}
    </div>
  );
}

export default RecipeInProgress;
