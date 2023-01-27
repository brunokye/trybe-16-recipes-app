import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';

import Footer from '../components/Footer';
import FoodContext from '../context/FoodContext';
import DrinksContext from '../context/DrinksContext';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';

import '../styles/Recipes.css';

export default function Recipes() {
  const location = useLocation();
  const pathname = location.pathname === '/meals' ? 'Meals' : 'Drinks';
  const isFood = pathname === 'Meals';
  const context = isFood ? FoodContext : DrinksContext;
  const { recipes, categories, setCategoryFilter, categoryFilter } = useContext(context);
  const idField = isFood ? 'idMeal' : 'idDrink';

  const pageSize = 12;
  const categorieSize = 5;

  return (
    <div>
      <Header
        title={ pathname }
        searchEnabled
      />
      <h1>Recipes</h1>
      <div className="categories-container">
        { categories.slice(0, categorieSize).map((category) => (
          <button
            type="button"
            data-testid={ `${category.strCategory}-category-filter` }
            key={ category.strCategory }
            onClick={ () => {
              const cat = categoryFilter === category.strCategory
                ? '' : category.strCategory;
              setCategoryFilter(cat);
            } }
          >
            { category.strCategory }
          </button>
        ))}
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setCategoryFilter('') }
        >
          All
        </button>
      </div>
      <div className="card-container">
        { recipes.slice(0, pageSize).map((recipe, index) => (
          <RecipeCard
            key={ recipe[idField] }
            recipe={ recipe }
            index={ index }
            id={ recipe[idField] }
            basePath={ isFood ? '/meals' : '/drinks' }
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
