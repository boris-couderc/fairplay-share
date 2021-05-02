import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory, Redirect } from 'react-router-dom'

import View from 'src/components/View'
import ScrollToTop from 'src/components/ScrollToTop'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Icon from 'src/components/Icon'
import Loader from 'src/components/Loader'
import Map from 'src/components/Map'
import Messages from 'src/containers/Messages'
import Modal from 'src/components/Modal'

import './style.scss'

const Activity = ({
    isLogged,
    isCheckedLoginLocalStorage,

    fetchActivity,
    activity,
    activityLoaded,

    userId,
    userActivitiesLoaded,
    userActivitiesParticipantRole,
    userActivitiesCreatorRole,

    joinActivity,
    quitActivity,

    clearActivity,
}) => {
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        if (!isLogged && isCheckedLoginLocalStorage) {
            history.push('/')
        }
    }, [isLogged, isCheckedLoginLocalStorage])

    useEffect(() => {
        fetchActivity(id)
        return () => {
            clearActivity()
        }
    }, [])

    const [userRole, setUserRole] = useState(null)
    useEffect(() => {
        if (userActivitiesLoaded && isLogged && activityLoaded) {
            const alreadyJoin = userActivitiesParticipantRole.find(
                (id) => id == activity.id,
            )
            const organize = userActivitiesCreatorRole.find(
                (id) => id == activity.id,
            )
            setUserRole(
                organize ? 'creator' : alreadyJoin ? 'participant' : 'visitor',
            )
        }
    }, [userActivitiesLoaded, isLogged, activityLoaded, userActivitiesParticipantRole])

    useEffect(() => {
        console.log('userRole', userRole)
    }, [userRole])

    /////////////////////

    const [modalDisplayed, setModalDisplayed] = useState(false)

    const handleClickCancel = (e) => {
        e.preventDefault()
        //joinActivity()
        //setModalDisplayed(false)
        console.log('handleClickCancel')
    }

    const handleClickQuit = (e) => {
        e.preventDefault()
        console.log('handleClickQuit')
        quitActivity()
        setUserRole(null)
        setModalDisplayed(false)
    }

    const handleClickJoin = (e) => {
        e.preventDefault()
        setUserRole(null)
        joinActivity()
        console.log('handleClickJoin')
    }

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
                                <Heading el="h1" classProps="h1--activity">
                                    {activity.title}
                                </Heading>

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
                                    <div className="activity__infos">
                                        <div className="activity__localisation">
                                            <Icon name="pin" />
                                            {activity.activity_place.city}
                                        </div>
                                        <div className="activity__calendar">
                                            <Icon name="calendar" />
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
                                </div>

                                <div
                                    className={`activity__infos-sup activity__infos-sup--${userRole}`}
                                >
                                    <div className="activity__desc">
                                        {activity.description}
                                    </div>
                                    <div className="activity__organization">
                                        <div className="activity__organization-bloc">
                                            <Heading
                                                el="h3"
                                                classProps="activity__organization-title"
                                            >
                                                <Icon name="flag" />
                                                Organisateur :
                                            </Heading>
                                            <div className="activity__organization-txt">
                                                {activity.creator.pseudo}
                                            </div>
                                        </div>
                                        <div className="activity__organization-bloc">
                                            <Heading
                                                el="h3"
                                                classProps="activity__organization-title activity__organization-title--2"
                                            >
                                                <Icon name="group" />
                                                Participants :
                                            </Heading>
                                            <div className="activity__organization-txt">
                                                {activity.participant_count}
                                                {activity.participant_count > 1
                                                    ? ' participants '
                                                    : ' participant '}
                                                <span className="activity__organization-txt--light">
                                                    {` (${activity.min_participant} requis)`}{' '}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="activity__registration">
                                        {userRole && userRole === 'creator' ? (
                                            <Button
                                                appearance="outline"
                                                size="big"
                                                icon="pin-off"
                                                onClick={handleClickCancel}
                                            >
                                                Annuler l'activité
                                            </Button>
                                        ) : userRole && userRole === 'participant' ? (
                                            <Button
                                                appearance="outline"
                                                size="big"
                                                icon="user-remove"
                                                onClick={()=>setModalDisplayed(true)}
                                            >
                                                Je me désinscris
                                            </Button>
                                        ) : userRole && userRole === 'visitor' ? (
                                            <Button
                                                appearance="primary"
                                                size="big"
                                                icon="user-add"
                                                onClick={handleClickJoin}
                                            >
                                                Je m'inscris
                                            </Button>
                                        ) : (
                                            <Loader />
                                        )}
                                        <div className="activity__registration-txt">
                                            Je m'engage à être présent le jour
                                            de l'activité, mais je peux si
                                            besoin me désinscrire à tout moment
                                            !
                                        </div>
                                    </div>
                                </div>
                                <div className="activity__map-messages">
                                    <Map
                                        lat={activity.activity_place.lat}
                                        lng={activity.activity_place.lng}
                                    />
                                    <Messages activityId={activity.id} />
                                </div>
                            </div>
                        ) : (
                            <Redirect to="/404" />
                        )}
                    </>
                )}
            </Wrapper>
            <Modal
                isDisplayed={modalDisplayed}
                icon="sentiment-dissatisfied"
                title="Etes vous sûr de vouloir vous désinscrire ?"
                txt=""
                txtBtYes="Je me désinscris"
                txtBtNo="Annuler"
                onClickYes={handleClickQuit}
                onClickNo={()=>setModalDisplayed(false)}
                closeModal={()=>setModalDisplayed(false)}
            />
        </View>
    )
}

Activity.propTypes = {}

export default Activity
