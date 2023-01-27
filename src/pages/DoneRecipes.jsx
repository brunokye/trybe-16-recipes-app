import React, { useState } from 'react';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';
import FilterBtn from '../components/FilterBtn';

const TYPES = ['All', 'Meals', 'Drinks'];

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

  const [usedFilter, setUsedFilter] = useState('All');

  const clickToFilter = (type) => {
    setUsedFilter(type);
  };

  return (
    <div>
      <Header title="Done Recipes" />
      <section id="filters">
        {
          TYPES.map((filterType, index) => (
            <FilterBtn
              key={ index }
              filterType={ filterType }
              usedFilter={ usedFilter }
              clickToFilter={ clickToFilter }
            />))
        }
      </section>
      <section id="cards">
        {
          usedFilter === 'Meals' && (
            doneRecipes
              .filter((recipe) => recipe.type === 'meal')
              .map((recipe, index) => (
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
          )
        }
        {
          usedFilter === 'Drinks' && (
            doneRecipes
              .filter((recipe) => recipe.type === 'drink')
              .map((recipe, index) => (
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
          )
        }
        {
          usedFilter === 'All' && (
            doneRecipes
              .map((recipe, index) => (
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
          )
        }
      </section>
    </div>
  );
}
