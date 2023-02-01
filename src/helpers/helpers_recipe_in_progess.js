export const newRecipe = (meals, drinks, typeOfUrl, magicNum) => ({
  id: meals.idMeal || drinks.idDrink,
  type: typeOfUrl.slice(0, magicNum.one),
  nationality: meals.strArea || '',
  category: meals.strCategory || drinks.strCategory,
  alcoholicOrNot: drinks.strAlcoholic || '',
  name: meals.strMeal || drinks.strDrink,
  image: meals.strMealThumb || drinks.strDrinkThumb,
});

export const callIngredients = (
  meals = undefined,
  drinks = undefined,
  isChecked,
  handleChecked,
) => {
  const magicNum = 20;
  const ingredients = [];
  const variable = meals !== undefined ? meals : drinks;
  for (let i = 1; i <= magicNum; i += 1) {
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
              textDecoration: isChecked(variable[`strIngredient${i}`])
                ? 'line-through solid rgb(0, 0, 0)'
                : 'none',
            } }
          >
            <input
              type="checkbox"
              onChange={ handleChecked }
              checked={ isChecked(variable[`strIngredient${i}`]) }
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
