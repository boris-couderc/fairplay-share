import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Heading from 'src/components/Heading'
import Icon from 'src/components/Icon'
import ActivityLink from 'src/components/ActivityLink'

import './style.scss'
import sports from 'src/assets/sports/sports'

import { useInView } from 'react-intersection-observer';

const Card = ({ activity, loggedUserRole, isLogged, showLoginModal }) => {
    
    const [classes, setClasses] = useState('card')

    const { ref, inView, entry } = useInView({
        threshold: 0,
        triggerOnce: true,
        delay: 200,
    });

    useEffect(() => {
        setClasses(classNames(
            'card',
            loggedUserRole === 'creator' && 'card--creator',
            loggedUserRole === 'participant' && 'card--participant',
            activity.activity_status_id == 2 && 'card--cancelled',
            inView && 'card--inview'
        ))
    }, [inView])

    return (
        <li className={classes} ref={ref}>
            {/* {activity.activity_status_id && activity.activity_status_id==2 && (
                <div className="u-color-error">
                    <Icon name="error" classProps="u-margin-bottom-.25"/>
                    <Heading el="p" classProps="u-color-error">
                        Activité annulée
                    </Heading>
                </div>
            )} */}
            <ActivityLink
                isLogged={isLogged}
                id={activity.id}
                onClick={showLoginModal}
                classProps="card__link"
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
                        <span className="card__info-city">{activity.activity_place.city}</span>
                        {activity.activity_place.distance && (
                            <span className="card__info-sup">
                                {` (${parseFloat(activity.activity_place.distance.toFixed(1))} km)`}
                            </span>
                        )}
                    </li>
                    <li className="card__info card__info--date">
                        {/* <Icon name="clock" /> */}
                        <Icon name="calendar" />
                        {activity.date}
                        <Icon name="clock" classProps="icon--clock" />
                        {/* <Icon name="calendar" /> */}
                        {activity.time}
                    </li>
                </ul>
            </ActivityLink>
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
