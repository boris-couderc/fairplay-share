import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Icon from 'src/components/Icon'

import { ReactComponent as Logo } from 'src/assets/fairplay-logo.svg'

import './style.scss'

const Header = ({ isLogged, onLogOut, points, grade }) => {
    return (
        <header className="header">
            <Wrapper /* wide */>
                <div className="header__content">
                    <Link to="/" className="header__logo">
                        <Logo alt="FairPlay" />
                    </Link>

                    {isLogged ? (
                        <div className="header__login">
                            <div className="header__account-reward-icons">
                                <Icon
                                    name="account"
                                    classProps="header__account-icon"
                                />
                                <Icon
                                    name="reward"
                                    classProps="header__reward-icon"
                                />
                                <div className="header__reward">
                                    <span className="header__grade">
                                        {grade}
                                    </span>
                                    {points} {points > 0 ? 'points' : 'point'}
                                </div>
                            </div>
                            <Button appearance="outline" onClick={onLogOut}>
                                Déconnexion
                            </Button>
                        </div>
                    ) : (
                        <div className="header__login">
                            <Button
                                appearance="outline"
                                route="/connexion"
                                icon="account"
                            >
                                Connexion
                            </Button>
                            <Button appearance="primary" route="/inscription">
                                Inscription
                            </Button>
                        </div>
                    )}
                </div>
            </Wrapper>
        </header>
    )
}

Header.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    onLogOut: PropTypes.func.isRequired,
    points: PropTypes.number,
    grade: PropTypes.string,
}

Header.defaultProps = {
    points: 0,
    grade: null,
}

export default Header
