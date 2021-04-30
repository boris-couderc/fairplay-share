import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory, Redirect } from 'react-router-dom';

import View from 'src/components/View'
import ScrollToTop from 'src/components/ScrollToTop'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Icon from 'src/components/Icon'
import Loader from 'src/components/Loader'

import './style.scss'

const Activity = ({
    isLogged,
    isCheckedLoginLocalStorage,

    fetchActivity,
    activity,
    activityLoaded,
    
    userActivitiesIds,
    userActivitiesCreatorIds,

    clearActivity,
}) => {
    const history = useHistory()
    const { id } = useParams();

    useEffect(() => {
        if (!isLogged && isCheckedLoginLocalStorage) {
            history.push('/');
        }
    }, [isLogged, isCheckedLoginLocalStorage])

    useEffect(() => {
        fetchActivity(id);
        return () => {
            clearActivity()
        }
    }, []);

    console.log('activity', activity);

    return (
        <View
            layoutClass="activity"
            //backgroundImg={`url(${currentSport})`}
            backgroundImg={`${activity ? activity.sport.icon : ''}`}
        >
            <ScrollToTop />
            <Wrapper>
                
                {!activityLoaded ? (  
                    <Loader classProps="loader--p3" />
                ) : (
                    <>
                        {activityLoaded ? (
                            <div className="activity">

                                <div className="activity__header">
                                    <Button 
                                        appearance="" 
                                        size="small"
                                        icon="arrow-left"
                                        classProps="is-hidden@to-medium"
                                        onClick={history.goBack}
                                    >
                                        Retour
                                    </Button>
                                    <Heading el="h1" classProps="h1--activity">{activity.title}</Heading>
                                </div>

                                <div className="activity__infos">
                                    <div className="activity__localisation">
                                        <Icon name="pin" /> 
                                        {activity.activity_place.city}
                                    </div>
                                    <div className="activity__calendar">
                                        <Icon name="calendar"/> 
                                        {activity.date}
                                    </div>
                                    <div className="activity__time">
                                        <Icon name="clock" />
                                        {activity.time}
                                    </div>
                                    <div className="activity__duration">
                                        <Icon name="timer" />
                                        {activity.duration}
                                    </div>
                                </div>

                                <div className="activity__infos-sup">
                                    <div className="activity__desc">
                                        {activity.description}
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                    </div>
                                    <div className="activity__organization">
                                        <div className="activity__organization-bloc">
                                            <Heading el="h3" classProps="activity__organization-title">
                                                <Icon name="flag"/>
                                                Organisateur :
                                            </Heading>
                                            <div className="activity__organization-txt">{activity.creator.pseudo}</div>
                                        </div>
                                        <div className="activity__organization-bloc">
                                            <Heading el="h3" classProps="activity__organization-title activity__organization-title--2">
                                                <Icon name="group"/>
                                                Participants :
                                            </Heading>
                                            <div className="activity__organization-txt">
                                                {activity.participant_count}
                                                {activity.participant_count > 1 ? ' participants ' : ' participant '}
                                                <span className="activity__organization-txt--light">{` (${activity.min_participant} requis)`} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="activity__registration">
                                        <Button 
                                            appearance="primary" 
                                            size="big"
                                            icon="pin-check"
                                            //onClick={}
                                        >
                                            Je participe
                                        </Button>
                                        <div className="activity__registration-txt">
                                            Je m'engage à être présent le jour de l'activité, mais je peux si besoin me désinscrire à tout moment !
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ) : (
                            <Redirect to="/404" />
                        )}
                    </>
                )}

            </Wrapper>
        </View>
    )
}

Activity.propTypes = {}

export default Activity
