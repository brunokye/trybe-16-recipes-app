import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { require } from 'clipboard-copy';
import { readObject, saveObject } from '../helpers/localStorage';
import { fetchByType as fetchMealByID } from '../services/mealAPI';
import { fetchByType as fetchDrinkByID } from '../services/cockTailAPI';
import useLocalStorage from '../hooks/useLocalStorage';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import {
  callIngredients,
  newRecipe as newRecipeHelper,
} from '../helpers/helpers_recipe_in_progess';

function RecipeInProgress() {
  const history = useHistory();
  const { id } = useParams();
  const location = useLocation();
  const path = location.pathname;
  const typeOfUrl = path.split('/')[1];
  const [checked, setChecked] = useState({});
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [copyLink, setCopyLink] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useLocalStorage('favoriteRecipes', []);
  const magicNum = {
    one: -1,
    three: 3,
  };

  useEffect(() => {
    const localStorageGet = readObject('inProgressRecipes', {});
    setChecked(localStorageGet);
  }, []);

  useEffect(() => {
    if (typeOfUrl === 'meals') {
      const fetchByID = async () => {
        fetchMealByID('id', id).then((data) => setMeals(data[0]));
      };
      fetchByID();
    } else {
      const fetchByID = async () => {
        fetchDrinkByID('id', id).then((data) => setDrinks(data[0]));
      };
      fetchByID();
    }
  }, [id]);

  const newRecipe = newRecipeHelper(meals, drinks, typeOfUrl, magicNum);

  useEffect(() => {
    const verifyRecipe = favoriteRecipes.some((recipes) => recipes.id === newRecipe.id);
    if (verifyRecipe) setFavorite(true);
  }, [meals, drinks]);

  const copyToClipboard = (idParam) => {
    const copy = require('clipboard-copy');
    const url = `http://localhost:3000/${typeOfUrl}/${idParam}`;
    copy(url);
    setCopyLink(true);
  };

  const isChecked = (ingredient) => {
    try {
      if (checked[typeOfUrl][id]?.includes(ingredient)) {
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  const handleChecked = (event) => {
    if (!checked[typeOfUrl]) checked[typeOfUrl] = {};

    const ingredient = event.target.value;
    const checkedList = checked[typeOfUrl][id] || [];
    if (!isChecked(ingredient)) {
      setChecked({
        ...checked,
        [typeOfUrl]: {
          ...checked[typeOfUrl],
          [id]: [...checkedList, ingredient],
        },
      });
    } else {
      setChecked({
        ...checked,
        [typeOfUrl]: {
          ...checked[typeOfUrl],
          [id]: checkedList.filter((item) => item !== ingredient),
        },
      });
    }
  };

  const checkDisabledBtn = () => {
    let ingredients = [];
    if (typeOfUrl === 'meals') {
      const callMeals = callIngredients(meals, undefined, isChecked, handleChecked);
      ingredients = [...callMeals];
    } else {
      const callDrinks = callIngredients(undefined, drinks, isChecked, handleChecked);
      ingredients = [...callDrinks];
    }
    try {
      if (checked[typeOfUrl][id].length === ingredients.length) {
        setIsDisabled(false);
      }
    } catch (error) {
      setIsDisabled(true);
    }
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

  useEffect(() => {
    saveObject('inProgressRecipes', checked);
    checkDisabledBtn();
  }, [checked]);

  const handleFinishRecipeBtn = () => {
    const localStorageLoad = readObject('doneRecipes', []);
    const doneRecipes = [...localStorageLoad];
    const date = new Date();
    const doneDate = date.toISOString();
    const doneRecipe = {
      id: meals.idMeal || drinks.idDrink,
      type: typeOfUrl.slice(0, magicNum.one),
      category: meals.strCategory || drinks.strCategory,
      alcoholicOrNot: drinks.strAlcoholic || '',
      name: meals.strMeal || drinks.strDrink,
      image: meals.strMealThumb || drinks.strDrinkThumb,
      doneDate,
      nationality: meals.strArea || '',
      tags: meals.strTags ? meals.strTags.split(',') : [],
    };
    doneRecipes.push(doneRecipe);
    saveObject('doneRecipes', doneRecipes);
    history.push('/done-recipes');
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
              onClick={ () => copyToClipboard(id) }
            >
              Share
            </button>
            {copyLink && <span>Link copied!</span>}
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
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ isDisabled }
              onClick={ handleFinishRecipeBtn }
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
          <ul>{callIngredients(meals, undefined, isChecked, handleChecked)}</ul>
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
              onClick={ () => copyToClipboard(id) }
            >
              Share
            </button>
            {copyLink && <span>Link copied!</span>}
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
            <button
              type="button"
              data-testid="finish-recipe-btn"
              onClick={ handleFinishRecipeBtn }
              disabled={ isDisabled }
            >
              Finish Recipe
            </button>
          </div>
          <p data-testid="recipe-category">{drinks.strAlcoholic}</p>
          <h5>Ingredients:</h5>
          <ul>{callIngredients(undefined, drinks, isChecked, handleChecked)}</ul>
          <h5>Instructions:</h5>
          <p data-testid="instructions">{drinks.strInstructions}</p>
        </div>
      )}
    </div>
  );
}

export default RecipeInProgress;
