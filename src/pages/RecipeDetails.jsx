import React, { useContext } from 'react';
import FoodContext from '../context/FoodContext';

export default function RecipeDetails() {
  const { mealsSelected } = useContext(FoodContext);
  console.log(mealsSelected);

  return (
    <div>RecipeDetails</div>
  );
}
