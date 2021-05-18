import React, { useEffect, useState, Suspense } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory, Redirect } from 'react-router-dom'
import classNames from 'classnames'

import View from 'src/components/View'
import ScrollToTop from 'src/components/ScrollToTop'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import Icon from 'src/components/Icon'
import Loader from 'src/components/Loader'
import Modal from 'src/components/Modal'

const Map = React.lazy(() => import('src/components/Map'));
const Messages = React.lazy(() => import('src/containers/Messages'));

import './style.scss'

const Activity = ({
    isLogged,
    isCheckedLoginLocalStorage,
    fetchActivity,
    activity,
    activityLoaded,
    userActivitiesLoaded,
    userActivitiesParticipantRole,
    userActivitiesCreatorRole,
    joinActivity,
    quitActivity,
    cancelActivity,
    clearActivity,
    showLoginModal,
}) => {
    const history = useHistory()
    const { id } = useParams()

    /*
    useEffect(() => {
        if (!isLogged && isCheckedLoginLocalStorage) {
            history.push('/')
        }
    }, [isLogged, isCheckedLoginLocalStorage])
    */

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
    }, [
        userActivitiesLoaded,
        isLogged,
        activityLoaded,
        userActivitiesParticipantRole,
        activity,
    ])

    const [infosSupClasses, setinfosSupClasses] = useState(
        'activity__infos-sup',
    )
    useEffect(() => {
        setinfosSupClasses(
            classNames(
                'activity__infos-sup',
                userRole && `activity__infos-sup--${userRole}`,
                activity &&
                    activity.activity_status_id == 2 &&
                    `activity__infos-sup--cancelled`,
            ),
        )
    }, [activity, userRole])

    const [modalDisplayed, setModalDisplayed] = useState(false)
    const [modalCandelDisplayed, setModalCandelDisplayed] = useState(false)
    const handleClickCancel = (e) => {
        e.preventDefault()
        setUserRole(null)
        setModalCandelDisplayed(false)
        cancelActivity()
    }
    const handleClickQuit = (e) => {
        e.preventDefault()
        quitActivity()
        setUserRole(null)
        setModalDisplayed(false)
    }
    const handleClickJoin = (e) => {
        e.preventDefault()
        setUserRole(null)
        joinActivity()
    }

    return (
        <View
            layoutClass="activity"
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
                                <div className={infosSupClasses}>
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
                                        {userRole &&
                                        userRole === 'creator' &&
                                        activity.activity_status_id == 3 ? (
                                            <Button
                                                appearance="outline"
                                                size="big"
                                                icon="pin-off"
                                                onClick={() =>
                                                    setModalCandelDisplayed(
                                                        true,
                                                    )
                                                }
                                            >
                                                Annuler l'activité
                                            </Button>
                                        ) : userRole &&
                                          userRole === 'participant' &&
                                          activity.activity_status_id == 3 ? (
                                            <Button
                                                appearance="outline"
                                                size="big"
                                                icon="user-remove"
                                                onClick={() =>
                                                    setModalDisplayed(true)
                                                }
                                            >
                                                Je me désinscris
                                            </Button>
                                        ) : userRole &&
                                          userRole === 'visitor' &&
                                          activity.activity_status_id == 3 ? (
                                            <Button
                                                appearance="primary"
                                                size="big"
                                                icon="user-add"
                                                onClick={handleClickJoin}
                                            >
                                                Je m'inscris
                                            </Button>
                                        ) : activity.activity_status_id == 2 ? (
                                            <div className="u-color-error">
                                                <Icon
                                                    name="error"
                                                    classProps="u-margin-bottom-.25"
                                                />
                                                <Heading
                                                    el="p"
                                                    classProps="u-color-error"
                                                >
                                                    Activité annulée
                                                </Heading>
                                            </div>

                                        ) : !isLogged && isCheckedLoginLocalStorage ? (
                                            <Button
                                                appearance="primary"
                                                size="big"
                                                icon="user-add"
                                                onClick={showLoginModal}
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
                                <Suspense fallback={<Loader classProps="u-margin-3" />}>
                                    <div className="activity__map-messages">
                                        <Map
                                            lat={activity.activity_place.lat}
                                            lng={activity.activity_place.lng}
                                            place={activity.activity_place}
                                        />
                                        <Messages activityId={activity.id} />
                                    </div>
                                </Suspense>
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
                title="Êtes-vous sûr de vouloir vous désinscrire ?"
                txt=""
                txtBtYes="Je me désinscris"
                txtBtNo="Annuler"
                onClickYes={handleClickQuit}
                onClickNo={() => setModalDisplayed(false)}
                closeModal={() => setModalDisplayed(false)}
            />
            <Modal
                isDisplayed={modalCandelDisplayed}
                icon="sentiment-dissatisfied"
                title="Êtes-vous sûr de vouloir annuler l'activité ?"
                txt=""
                txtBtYes="Oui j'annule"
                txtBtNo="Non"
                onClickYes={handleClickCancel}
                onClickNo={() => setModalCandelDisplayed(false)}
                closeModal={() => setModalCandelDisplayed(false)}
            />
        </View>
    )
}

Activity.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    isCheckedLoginLocalStorage: PropTypes.bool.isRequired,
    fetchActivity: PropTypes.func.isRequired,
    activity: PropTypes.object,
    activityLoaded: PropTypes.bool.isRequired,
    userActivitiesLoaded: PropTypes.bool.isRequired,
    userActivitiesParticipantRole: PropTypes.array.isRequired,
    userActivitiesCreatorRole: PropTypes.array.isRequired,
    joinActivity: PropTypes.PropTypes.func.isRequired,
    quitActivity: PropTypes.PropTypes.func.isRequired,
    cancelActivity: PropTypes.PropTypes.func.isRequired,
    clearActivity: PropTypes.PropTypes.func.isRequired,
    showLoginModal: PropTypes.func.isRequired,
}

Activity.defaultProps = {
    activity: null,
}

export default Activity
