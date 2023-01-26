// export const fetchApiMeals = async (selected) => {
//   try {
//     if (selected === 'first-letter') {
//       if (selected.value > 1) {
//         setGlobalAlert('Your search must have only 1 (one) character');
//       } else {
//         const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${selected}`);

//         if (!response.ok) {
//           const newError = await response.json();
//           throw newError.message;
//         }

//         const data = await response.json();
//         console.log('fetch', data);
//         return data;
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const fetchApiMeals = async (selected, searchInput) => {
  try {
    console.log(searchInput);
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
