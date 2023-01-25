import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title, searchEnabled }) {
  const [bar, setBar] = useState(false);

  const searchBar = () => {
    if (bar === false) setBar(true);
    if (bar === true) setBar(false);
  };

  return (
    <div>
      <span data-testid="page-title">{ title }</span>

      { bar ? (
        <input
          data-testid="search-input"
          type="text"
        />)
        : ''}

      { searchEnabled ? (
        <button
          type="button"
          onClick={ searchBar }
        >
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search"
          />
        </button>)
        : ''}

      <Link to="profile">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profile"
        />
      </Link>

    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  searchEnabled: PropTypes.bool,
}.isRequired;
