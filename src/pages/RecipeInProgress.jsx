import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { readObject, saveObject } from '../helpers/localStorage';

function RecipeInProgress() {
  const { id } = useParams();
  const location = useLocation();
  const path = location.pathname;
  const pathArray = path.split('/');

  const localStorageGet = readObject('inProgressRecipes') || [];

  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [checked, setChecked] = useState(localStorageGet);
  const [isDisabled, setIsDisabled] = useState(true);

  const drinkORmeal = pathArray[1];

  const maxIngredientsMeals = 20;
  const maxIngredientsDrinks = 15;
  const ingredients = [];

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

  const checkDisabledBtn = () => {
    if (checked.length === ingredients.length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  useEffect(() => {
    saveObject('inProgressRecipes', checked);
    checkDisabledBtn();
  }, [checked]);

  const callIngredients = (string) => {
    const maxIngredient = string === 'meals' ? maxIngredientsMeals : maxIngredientsDrinks;
    const variable = string === 'meals' ? meals : drinks;

    const handleChecked = (event) => {
      let updatedChecked = [...checked];
      if (event.target.checked) {
        updatedChecked = [...checked, event.target.value];
      } else {
        updatedChecked.splice(updatedChecked.indexOf(event.target.value), 1);
      }
      setChecked(updatedChecked);
    };

    const isChecked = (ingredient) => (checked
      .includes(ingredient) ? 'line-through solid rgb(0, 0, 0)' : 'none');

    for (let i = 1; i <= maxIngredient; i += 1) {
      if (variable[`strIngredient${i}`]) {
        ingredients.push(
          <li
            key={ i }
            data-testid={ `${i - 1}-ingredient-name-and-measure` }
          >
            <label
              htmlFor={ i }
              data-testid={ `${i - 1}-ingredient-step` }
              style={ {
                textDecoration: isChecked(variable[`strIngredient${i}`]),
              } }
            >
              <input
                type="checkbox"
                onChange={ handleChecked }
                checked={ checked.includes(variable[`strIngredient${i}`]) }
                value={ variable[`strIngredient${i}`] }
              />
              {variable[`strIngredient${i}`]}
              {' '}
              -
              {' '}
              {variable[`strMeasure${i}`]}
            </label>
          </li>,
        );
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
            <button
              type="button"
              data-testid="share-btn"
            >
              Share
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
            >
              Favorite
            </button>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ isDisabled }
            >
              Finish Recipe
            </button>
          </div>
          <p data-testid="recipe-category">
            Category:
            {' '}
            {meals.strCategory}
          </p>
          <h5>Ingredients:</h5>
          <ul>{callIngredients(drinkORmeal)}</ul>
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
            <button
              type="button"
              data-testid="share-btn"
            >
              Share
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
            >
              Favorite
            </button>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ isDisabled }
            >
              Finish Recipe
            </button>
          </div>
          <p data-testid="recipe-category">{drinks.strAlcoholic}</p>
          <h5>Ingredients:</h5>
          <ul>{callIngredients(drinkORmeal)}</ul>
          <h5>Instructions:</h5>
          <p data-testid="instructions">{drinks.strInstructions}</p>
        </div>
      )}
    </div>
  );
}

export default RecipeInProgress;
