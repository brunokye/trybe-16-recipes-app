import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import DrinksRender from '../components/DrinksRender';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MealsRender from '../components/MealsRender';
import DrinksContext from '../context/DrinksContext';
import FoodContext from '../context/FoodContext';

export default function Recipes() {
  const { mealsSelectedLength } = useContext(FoodContext);
  const { drinksSelectedLength } = useContext(DrinksContext);

  const location = useLocation();
  const pathname = location.pathname === '/meals' ? 'Meals' : 'Drinks';

  return (
    <div>
      <Header
        title={ pathname }
        searchEnabled
      />
      <h1>Recipes</h1>

      {
        mealsSelectedLength >= 1
      && <MealsRender />
      }

      {
        drinksSelectedLength >= 1
        && <DrinksRender />
      }

      <Footer />
    </div>
  );
}
