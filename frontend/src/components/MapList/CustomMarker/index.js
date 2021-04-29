import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Marker } from 'react-map-gl'

import ActivityLink from 'src/components/ActivityLink'

import './style.scss'
import sports from 'src/assets/sports/sports'

const CustomMarker = ({ marker, isLogged, showLoginModal }) => {
    return (
        <Marker
            longitude={parseFloat(marker.lng)}
            latitude={parseFloat(marker.lat)}
        >
            <div className="marker">
                <div className="marker__card">
                    {marker.activities.length > 0 &&
                        marker.activities.map((activity, index) => {
                            return (
                                <ActivityLink
                                    key={`activity-${index}`}
                                    isLogged={isLogged}
                                    id={activity.id}
                                    onClick={showLoginModal}
                                    classProps={`marker__link marker__link--${activity.userRole}`}
                                >
                                    <img
                                        src={sports[activity.icon]}
                                        alt=""
                                        className="marker__image"
                                    />
                                    <div className="marker__content">
                                        <div className="marker__title">
                                            {activity.title}
                                        </div>
                                        <div className="marker__date">
                                            {activity.date}
                                            {activity.time && (
                                                <span className="marker__time">
                                                    {activity.time}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </ActivityLink>
                            )
                        })}
                </div>
            </div>
        </Marker>
    )
}

CustomMarker.propTypes = {
    marker: PropTypes.object.isRequired,
    isLogged: PropTypes.bool.isRequired,
    showLoginModal: PropTypes.func.isRequired,
}

export default CustomMarker
