import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import FoodContext from '../context/FoodContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title, searchEnabled }) {
  const { setSearchInputValue } = useContext(FoodContext);

  const [bar, setBar] = useState(false);

  const searchBar = () => {
    if (bar === false) setBar(true);
    if (bar === true) setBar(false);
  };

  const handleChangeSearchInput = ({ target }) => {
    setSearchInputValue(target.value);
  };

  return (
    <div>
      <span data-testid="page-title">{ title }</span>

      { bar ? (
        <input
          data-testid="search-input"
          type="text"
          onChange={ handleChangeSearchInput }
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
