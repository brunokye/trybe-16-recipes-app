const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const fetchDrinks = async () => {
  const response = await fetch(`${baseUrl}search.php?s=`);
  const { drinks } = await response.json();
  return drinks;
};

export const fetchDrinksCategories = async () => {
  const response = await fetch(`${baseUrl}list.php?c=list`);
  const { drinks } = await response.json();
  return drinks;
};

export const fetchDrinksByCategory = async (category) => {
  const response = await fetch(`${baseUrl}filter.php?c=${category}`);
  const { drinks } = await response.json();
  return drinks;
};
