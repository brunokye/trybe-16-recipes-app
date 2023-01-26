import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import shareIcon from '../images/shareIcon.svg';

export default function RecipeCard({
  recipeId, title, index, image, name, category,
  doneDate, tags, nationality, type, alcoholicOrNot }) {
  console.log(title);
  return (
    <section>
      {
        title === 'Done Recipes' && (
          <div title="card">
            <div id="image">
              <img
                src={ image }
                alt="Foto da receita"
                data-testid={ `${index}-horizontal-image` }
              />
            </div>
            { type === 'meal' && (
              <div id="meals-data">
                <div>
                  <h4
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { name }
                  </h4>
                  <h6
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    <span>{ nationality }</span>
                    {' - '}
                    <span
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      { category }
                    </span>
                  </h6>
                </div>
                <p>
                  <span>Sone in:</span>
                  <span data-testid={ `${index}-horizontal-done-date` }>
                    { doneDate }
                  </span>
                </p>
                <div>
                  {
                    tags
                      .map((tag) => (
                        <button
                          type="button"
                          key={ tag }
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                        >
                          { tag }
                        </button>
                      ))
                  }
                </div>
              </div>
            ) }
            { type === 'drink' && (
              <div id="meals-data">
                <div>
                  <h4
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { name }
                  </h4>
                  <h6
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    <span>{ alcoholicOrNot }</span>
                  </h6>
                </div>
                <p>
                  <span>Sone in:</span>
                  <span data-testid={ `${index}-horizontal-done-date` }>
                    { doneDate }
                  </span>
                </p>
                <div>
                  {
                    tags
                      .map((tag) => (
                        <button
                          type="button"
                          key={ tag }
                          data-testid={ `${index}-${tag}-horizontal-tag` }
                        >
                          { tag }
                        </button>
                      ))
                  }
                </div>
              </div>
            ) }
            <div id="share">
              <Link to={ `/${category}/${recipeId}` }>
                <img
                  src={ shareIcon }
                  alt="Ícone para compartilhar receita."
                  data-testid={ `${index}-horizontal-share-btn` }
                  width="20"
                  height="20"
                />
              </Link>
            </div>
          </div>
        )
      }
    </section>
  );
}

RecipeCard.propTypes = {
  title: PropTypes.string,
}.isRequired;
