import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'

import { ReactComponent as Logo } from 'src/assets/fairplay-logo.svg'

import userIcon from 'src/assets/icons/account_circle.svg'
import gradeIcon from 'src/assets/icons/grade.svg'

import './style.scss'

const Header = ({ isLogged, onLogOut, points, grade }) => {
    // console.log(isLogged);

    return (
        <header className="header">
            <Wrapper wide>
                <div className="header__content">
                    <Link to="/" className="header__logo">
                        <Logo alt="FairPlay" />
                    </Link>

                    {isLogged ? (
                        <div className="header__logged">

                            <Button
                                appearance="outline"
                                onClick={onLogOut}
                            >
                                Déconnexion
                            </Button>

                        </div>
                    ) : (
                        <ul className="header__buttons">
                            <li>
                                <Button
                                    appearance="outline"
                                    route="/connexion"
                                    icon="account"
                                >
                                    Connexion
                                </Button>
                            </li>
                            <li>
                                <Button
                                    appearance="primary"
                                    route="/inscription"
                                >
                                    Inscription
                                </Button>
                            </li>
                        </ul>
                    )}
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
      
  }
  */
}

Header.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    onLogOut: PropTypes.func.isRequired,
    points: PropTypes.number,
    grade: PropTypes.object,
}

Header.defaultProps = {
    points: 0,
    grade: {},
}

export default Header
