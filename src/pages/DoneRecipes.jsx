import React from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

export default function DoneRecipes() {
  const baseDoneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  localStorage.setItem('doneRecipes', JSON.stringify(baseDoneRecipes));
  const doneRecipesLS = localStorage.getItem('doneRecipes');
  const doneRecipes = JSON.parse(doneRecipesLS);

  return (
    <div>
      <Header title="Done Recipes" />
      <section id="filters">
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          <img
            src={ mealIcon }
            alt="Icone de comida para filtras apenas as comidas"
          />
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          <img
            src={ drinkIcon }
            alt="Icone de comida para filtras apenas as comidas"
          />
        </button>
      </section>
      <section id="cards">
        {
          doneRecipes.map((recipe, index) => (
            <RecipeCard
              title="Done Recipes"
              key={ recipe.id }
              recipeId={ recipe.id }
              index={ index }
              image={ recipe.image }
              name={ recipe.name }
              category={ recipe.category }
              doneDate={ recipe.doneDate }
              tags={ recipe.tags }
              nationality={ recipe.nationality }
              alcoholicOrNot={ recipe.alcoholicOrNot }
              type={ recipe.type }
            />
          ))
        }
      </section>
    </div>
  );
}
