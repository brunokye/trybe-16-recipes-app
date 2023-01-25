import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ title, searchEnabled }) {
  return (
    <div>
      <span data-testid="page-title">{ title }</span>

      { searchEnabled ? (
        <img
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="search"
        />)
        : ''}

      <img
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="profile"
      />
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  searchEnabled: PropTypes.bool,
}.isRequired;
