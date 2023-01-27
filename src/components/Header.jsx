import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title, searchEnabled }) {
  const [bar, setBar] = useState(false);

  return (
    <div>
      <span data-testid="page-title">{ title }</span>
      { searchEnabled ? (
        <button
          type="button"
          onClick={ () => setBar(!bar) }
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

      <div className="search">
        {bar && <SearchBar />}
      </div>

    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  searchEnabled: PropTypes.bool,
}.isRequired;
