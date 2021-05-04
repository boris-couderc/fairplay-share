import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import Heading from 'src/components/Heading'

import './style.scss'

const HeroLogged = ({ user, userActivities, userActivitiesLoaded }) => {
    const [countActiveCreatedActivities, setCountActiveCreatedActivities] = useState(null)
    const [countActiveParticipantActivities, setCountActiveParticipantActivities] = useState(null)
    const [countActiveActivities, setCountActiveActivities] = useState(null)

    useEffect(() => {
        if(userActivitiesLoaded) {
            const ActiveCreatedActivities = userActivities.activities.filter(activity => (
                activity.activity_status_id == 3 && activity.creator_id == user.id
            ))
            const ActiveParticipantActivities = userActivities.activities.filter(activity => (
                activity.activity_status_id == 3 && activity.creator_id !== user.id
            )) 
            setCountActiveCreatedActivities(ActiveCreatedActivities.length)
            setCountActiveParticipantActivities(ActiveParticipantActivities.length)
            setCountActiveActivities(ActiveCreatedActivities.length+ActiveParticipantActivities.length)
        }
    }, [userActivitiesLoaded])

    return (
        <div className="hero-logged">
            <Heading el="h1" classProps="hero-logged__title">
                <span>Hello</span>{' '}
                <span className="hero-logged__pseudo">{user.pseudo}</span>
            </Heading>
            <Heading el="p" like="h6" classProps="hero-logged__sub-title">
                {userActivitiesLoaded && !countActiveActivities > 0 && (
                    <>  
                        <span>
                            Tu ne participes encore à aucune activité ?<br />
                            Inscris toi vite ou propose en une !<br />
                        </span>
                    </>
                )}
                {userActivitiesLoaded && countActiveActivities > 0 && (
                    <>
                        <span>
                            Bravo pour ton partage et ta motivation&nbsp;!<br />
                        </span>
                        Tu{' '}
                        {countActiveCreatedActivities > 0 && (
                            <>
                                organises{' '}
                                <span className="u-color-secondary">
                                    {countActiveCreatedActivities}&nbsp;
                                    {countActiveCreatedActivities == 1 ? 'activité' : 'activités'},
                                </span>
                            </>
                        )}
                        {countActiveCreatedActivities > 0 && countActiveParticipantActivities > 0 && (
                            <>
                                {' '}tu{' '}
                            </>
                        )}
                        {countActiveParticipantActivities > 0 && (
                            <>
                                participes à{' '}
                                <span className="u-color-primary">
                                    {countActiveParticipantActivities}&nbsp;
                                    {countActiveParticipantActivities == 1 ? 'activité' : 'activités'},
                                </span>
                            </>
                        )}
                        {user.points > 0 && (
                            <>
                                <br />
                                ton compte motivation Fairplay est à{' '}
                                <span className="u-color-primary">
                                {user.points}&nbsp;points&nbsp;!
                                </span>
                            </>
                        )}
                    </>
                )}
            </Heading>
        </div>
    )
}

HeroLogged.propTypes = {
    user: PropTypes.object.isRequired,
    userActivities: PropTypes.object.isRequired,
    userActivitiesLoaded: PropTypes.bool.isRequired,
}

export default HeroLogged
