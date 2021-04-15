import React from 'react';
import PropTypes from 'prop-types';

import Wrapper from 'src/components/Wrapper';
import Button from 'src/components/Button';

import userIcon from 'src/assets/icons/account_circle.svg';
import gradeIcon from 'src/assets/icons/grade.svg';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from 'src/assets/fairplay-logo.svg';

import './style.scss';

const Header = ({ isLogged, DisconnectOnClick, points, grade }) => {
  // console.log(isLogged);
  
  return (
    <header className="header">
      <Wrapper wide>
        <div className="header__content">
          <Link to="/" className="header__logo">
            <Logo alt="FairPlay"/>
          </Link>

          <ul className="header__buttons">
            <li>

              {/* <Link to="/connexion" className="header__login">
                <img
                  className="header__icon"
                  src={userIcon}
                  alt="l'icône de l'utilisateur"
                />
                Connexion
              </Link> */}

              <Button 
                appearance="outline"
                route="/connexion"
              >
                Connexion
              </Button> 
              
            </li>
            <li>

              {/* <Link to="/inscription" className="header__signup">
                Inscription
              </Link> */}

              <Button 
                appearance="primary"
                route="/inscription"
              >
                Inscription
              </Button>

            </li>
          </ul>
        
        </div>
      </Wrapper>
    </header>
  )

  /*
  switch (isLogged) {
    case true:
      return (
        <header className="header">
          <Link to="/" className="header__home">
            <img className="header__logo" src={logo} alt="FairPlay" />
          </Link>
          <nav className="header__nav">
            <ul className="header__buttons">
              <li>
                <a>
                  <img
                    className="header__user"
                    src={userIcon}
                    alt="l'icone de l'utilisateur"
                  />
                </a>
              </li>
              <li>
                <img
                  className="header__grade"
                  src={gradeIcon}
                  alt="l'icone de son grade"
                />
                <div className="header__points">
                  <strong>{grade.name}</strong> <br />
                  {points} points
                </div>
              </li>
              <li>
                <button
                  type="button"
                  className="header__disconnect"
                  onClick={DisconnectOnClick}
                >
                  Déconnexion
                </button>
              </li>
            </ul>
          </nav>
        </header>
      );
    default:
      return (
        <header className="header">
          <Link to="/" className="header__home">
            <img className="header__logo" src={logo} alt="FairPlay" />
          </Link>
          <nav className="header__nav">
            <ul className="header__buttons">
              <li>
                <Link to="/connexion" className="header__login">
                  <img
                    className="header__icon"
                    src={userIcon}
                    alt="l'icône de l'utilisateur"
                  />
                  Connexion
                </Link>
              </li>
              <li>
                <Link to="/inscription" className="header__signup">
                  Inscription
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      );
  }
  */
};

Header.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  DisconnectOnClick: PropTypes.func.isRequired,
  points: PropTypes.number,
  grade: PropTypes.object,
};

Header.defaultProps = {
  points: 0,
  grade: {},
};
export default Header;
