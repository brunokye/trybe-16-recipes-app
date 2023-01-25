import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { isValidEmail, isValidPassword } from '../helpers';
import { saveUser } from '../services/userLS';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const history = useHistory();

  const doLogin = () => {
    saveUser({ email });
    history.push('/meals');
  };

  useEffect(() => {
    const isEmailValid = isValidEmail(email);
    const isPasswordValid = isValidPassword(password);
    const isDisabled = !(isEmailValid && isPasswordValid);
    setDisabled(isDisabled);
  }, [email, password]);

  return (
    <div>
      <h1>Login</h1>
      <label htmlFor="email">
        Email
        <input
          type="email"
          id="email"
          data-testid="email-input"
          onChange={ ({ target: { value } }) => setEmail(value) }
          value={ email }
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          type="password"
          id="password"
          data-testid="password-input"
          onChange={ ({ target: { value } }) => setPassword(value) }
          value={ password }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ doLogin }
        disabled={ disabled }
      >
        Login
      </button>
    </div>
  );
}
