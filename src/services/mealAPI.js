const baseUrl = 'https://www.themealdb.com/api/json/v1/1/';

export const fetchMeals = async () => {
  const response = await fetch(`${baseUrl}search.php?s=`);
  const { meals } = await response.json();
  return meals;
};

export const fetchMealsCategories = async () => {
  const response = await fetch(`${baseUrl}list.php?c=list`);
  const { meals } = await response.json();
  return meals;
};
