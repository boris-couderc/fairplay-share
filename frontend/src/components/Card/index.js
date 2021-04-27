import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './style.scss'

import Heading from 'src/components/Heading'
//import Button from 'src/components/Button'
import Icon from 'src/components/Icon'
import CardLink from './CardLink'
import sports from 'src/assets/sports/sports'

const Card = ({ activity, loggedUserRole, isLogged, showLoginModal }) => {
    const classes = classNames(
        'card',
        loggedUserRole === 'creator' && 'card--creator',
        loggedUserRole === 'participant' && 'card--participant',
    )

    return (
        <li className={classes}>
            <CardLink
                isLogged={isLogged}
                id={activity.id}
                onClick={showLoginModal}
            >
                <img
                    src={sports[activity.sport.name]}
                    alt=""
                    className="card__img"
                    width="300"
                    height="300"
                />
                <Heading el="h2" like="h5">
                    {activity.title}
                </Heading>
                <p className="card__desc">{activity.description}</p>
                <ul className="card__infos">
                    <li className="card__info">
                        <Icon name="pin" classProps="card__info-pin" />
                        {activity.activity_place.city}
                        {activity.activity_place.distance && (
                            <span className="card__info-sup">
                                { parseFloat(activity.activity_place.distance.toFixed(1))} km
                            </span>
                        )}
                    </li>
                    <li className="card__info">
                        <Icon name="clock" />
                        {activity.date}
                        {activity.time && (
                            <span className="card__info-sup">
                                {activity.time}
                            </span>
                        )}
                    </li>
                </ul>
                {/* <Button appearance="outline" size="small">
                    Voir les détails
                </Button> */}
            </CardLink>
        </li>
    )
}

Card.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    activity: PropTypes.object.isRequired,
    showLoginModal: PropTypes.func.isRequired,
    loggedUserRole: PropTypes.string,
}

Card.defaultProps = {
    loggedUserRole: null,
}

export default Card
