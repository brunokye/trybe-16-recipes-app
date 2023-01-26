import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodContext from '../context/FoodContext';
import DrinksContext from '../context/DrinksContext';
import RecipeCard from '../components/RecipeCard';
import '../styles/Recipes.css';

export default function Recipes() {
  const location = useLocation();
  const pathname = location.pathname === '/meals' ? 'Meals' : 'Drinks';
  const { foods } = useContext(FoodContext);
  const { drinks } = useContext(DrinksContext);
  const isFood = pathname === 'Meals';
  const recipes = isFood ? foods : drinks;
  const idField = isFood ? 'idMeal' : 'idDrink';

  const pageSize = 12;

  return (
    <div>
      <Header
        title={ pathname }
        searchEnabled
      />
      <h1>Recipes</h1>
      <div className="card-container">
        { recipes.slice(0, pageSize).map((recipe, index) => (
          <RecipeCard
            key={ recipe[idField] }
            recipe={ recipe }
            index={ index }
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}
