import { useContext } from 'react';
import { Link } from 'react-router-dom';
import DrinksContext from '../context/DrinksContext';

export default function DrinksRender() {
  const { drinksSelected, drinksSelectedLength } = useContext(DrinksContext);
  return (
    <div>

      {!drinksSelectedLength && drinksSelected.drinks
        ? drinksSelected.drinks.map((drink, index) => {
          const card = `${index}-recipe-card`;
          const img = `${index}-card-img`;
          const name = `${index}-card-name`;
          const num = 12;
          if (index < num) {
            return (
              <Link
                to={ `/drinks/${drink.iDdrink}` }
                key={ drink.idDrink }
                data-testid={ card }
              >
                <img
                  data-testid={ img }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  width="150"
                />
                <h2 data-testid={ name }>{drink.strDrink}</h2>
              </Link>
            );
          }
          return null;
        }) : drinksSelected.drinks.map((drink, index) => {
          const name = `${index}-card-name`;
          const num = 12;
          if (index < num) {
            return (
              <Link
                to={ `/drinks/${drink.idDrink}` }
                key={ drink.iDdrink }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  width="150"
                />
                <h2 data-testid={ name }>{drink.strDrink}</h2>
              </Link>
            );
          }
          return null;
        })}
    </div>
  );
}
