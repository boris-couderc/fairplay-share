import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Heading from 'src/components/Heading'
import Icon from 'src/components/Icon'
import CardLink from './CardLink'
import sports from 'src/assets/sports/sports'

import './style.scss'

import { useInView } from 'react-intersection-observer';

const Card = ({ activity, loggedUserRole, isLogged, showLoginModal }) => {
    
    const [classes, setClasses] = useState('card')

    const { ref, inView, entry } = useInView({
        threshold: 0,
        triggerOnce: true,
        delay: 200,
    });

    useEffect(() => {
        console.log('inView', inView);
        setClasses(classNames(
            'card',
            loggedUserRole === 'creator' && 'card--creator',
            loggedUserRole === 'participant' && 'card--participant',
            inView && 'card--inview'
        ))
    }, [inView])

    return (
        <li className={classes} ref={ref}>
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
