// == Import npm
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import
import './style.scss';

// == Composant
const Login = ({
  password,
  email,
  user,
  OnChangeValue,
  OnClickLoginForm,
  error,
}) => {
  switch (user.pseudo) {
    case undefined:
      return (
        <section className="login">
          <h1 className="login__title">Connexion</h1>
          {error && <p className="login__error">Adresse email ou mot de passe invalide</p>}
          <input className="login__input" type="email" placeholder="Votre adresse email" value={email} onChange={OnChangeValue} />
          <input className="login__input" type="password" placeholder="Votre mot de passe" value={password} onChange={OnChangeValue} />
          <button type="button" className="login__button" onClick={OnClickLoginForm}>Connexion</button>
          <Link to="/inscription" className="login__noAccount">Vous n'avez pas de compte ?</Link>
        </section>
      );
    default:
      return (
        <Redirect to="/" />
      );
  }
};

Login.propTypes = {
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  OnChangeValue: PropTypes.func.isRequired,
  OnClickLoginForm: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
};

// == Export
export default Login;
