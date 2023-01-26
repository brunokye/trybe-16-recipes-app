import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getUser } from '../services/userLS';

export default function Profile() {
  const userEmail = getUser().email;
  return (
    <div>
      <Header title="Profile" />
      <span data-testid="profile-email">{ userEmail }</span>

      <div>
        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
        </Link>

        <Link to="/">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </button>
        </Link>

        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
          >
            Logout
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}
