import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { require } from 'clipboard-copy';
import { Link } from 'react-router-dom';

import shareIcon from '../images/shareIcon.svg';

export default function RecipeCard({
  recipeId, title, index, image, name, category,
  doneDate, tags, nationality, type, alcoholicOrNot }) {
  const [copyLink, setCopyLink] = useState(false);
  const copy = require('clipboard-copy');

  const copyToClipboard = (id) => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setCopyLink(true);
  };

  return (
    <section>
      {
        title === 'Done Recipes' && (
          <div title="card">
            <div id="image">
              <Link to={ `http://localhost:3000/${type}s/${id}` }>
                <img
                  src={ image }
                  alt="Foto da receita"
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
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
              <button
                type="button"
                onClick={ () => copyToClipboard(recipeId) }
              >
                <img
                  src={ shareIcon }
                  alt="Ícone para compartilhar receita."
                  data-testid={ `${index}-horizontal-share-btn` }
                  width="20"
                  height="20"
                />
              </button>
              { copyLink && (
                <span>Link copied!</span>
              ) }
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
