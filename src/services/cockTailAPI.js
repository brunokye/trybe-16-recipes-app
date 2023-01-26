export const fetchDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await response.json();
  return drinks;
};
