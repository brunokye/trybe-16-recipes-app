export const fetchByIngredient = async (searchInput) => {
  try {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;

    console.log(URL);
    const response = await fetch(URL);

    if (!response.ok) {
      const newError = await response.json();
      throw newError.message;
    }

    const data = await response.json();

    console.log('fetch', data);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchByName = async (searchInput) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

  console.log(URL);
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
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;

    console.log(URL);
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

export const fetchApiMeals = async (selected, searchInput) => {
  console.log(searchInput);
  switch (selected) {
  case 'ingredient':
    fetchByIngredient(searchInput);
    break;

  case 'name':
    fetchByName(searchInput);
    break;

  case 'first-letter':
    if (selected.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    fetchByFirstLetter(searchInput);

    break;

  default:
    break;
  }
};
