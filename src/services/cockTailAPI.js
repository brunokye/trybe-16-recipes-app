const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1/';

export const fetchByIngredient = async (searchInput) => {
  try {
    const URL = `${baseUrl}filter.php?i=${searchInput}`;
    const response = await fetch(URL);

    if (!response.ok) {
      const newError = await response.json();
      throw newError.message;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchByName = async (searchInput) => {
  const URL = `${baseUrl}search.php?s=${searchInput}`;

  const response = await fetch(URL);

  if (!response.ok) {
    const newError = await response.json();
    throw newError.message;
  }

  const data = await response.json();

  return data;
};

export const fetchByFirstLetter = async (searchInput) => {
  try {
    const URL = `${baseUrl}search.php?f=${searchInput}`;

    const response = await fetch(URL);

    if (!response.ok) {
      const newError = await response.json();
      throw newError.message;
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchApiCockTail = async (selected, searchInput) => {
  switch (selected) {
  case 'ingredient':
    return fetchByIngredient(searchInput);
    // break;

  case 'name':
    return fetchByName(searchInput);
    // break;

  case 'first-letter':
    if (selected.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    return fetchByFirstLetter(searchInput);

    // break;

  default:
    break;
  }
};

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
