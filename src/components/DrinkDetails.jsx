import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';

export default function DrinkDetails({ result }) {
  const [ingredients, setIngredients] = useState([]);
  const { strDrinkThumb, strDrink, strAlcoholic, strInstructions } = result;

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
    </div>
  );
}

DrinkDetails.propTypes = {}.isRequired;
