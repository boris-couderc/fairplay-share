import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import Button from 'src/components/Button'

import ReactMapGL, { NavigationControl } from 'react-map-gl'
import CustomMarker from './CustomMarker'

import './style.scss'
import '/src/assets/css/mapbox-gl.css'

const formatedActivity = (activity, userRole) => {
    return {
        id: activity.id,
        title: activity.title,
        date: activity.date,
        time: activity.time,
        sport: activity.sport.name,
        icon: activity.sport.icon,
        userRole: userRole,
    }
}

const MapList = ({
    isLogged,
    showLoginModal,
    activities,
    lat,
    lng,
    userActivitiesIds,
    userActivitiesCreatorIds,
}) => {
    // Clusterize markers if activities are close to each other
    const markerPoints = []
    activities.forEach((activity, index) => {
        const activityLat =
            Math.round(activity.activity_place.lat * 1000) / 1000
        const activityLng =
            Math.round(activity.activity_place.lng * 1000) / 1000
        let userRole = ''
        if (userActivitiesCreatorIds.includes(activity.id)) {
            userRole = 'creator'
        } else if (userActivitiesIds.includes(activity.id)) {
            userRole = 'participant'
        }
        let markerFind = markerPoints.find(
            (marker) =>
                marker.lat === activityLat && marker.lng === activityLng,
        )
        if (markerFind) {
            markerFind.activities.push(formatedActivity(activity, userRole))
        } else {
            markerPoints.push({
                name: `marker${index}`,
                lat: activityLat,
                lng: activityLng,
                activities: [formatedActivity(activity, userRole)],
            })
        }
    })

    useEffect(() => {
        setViewport({
            latitude: parseFloat(lat),
            longitude: parseFloat(lng),
            zoom: 12,
        })
    }, [lat, lng])

    const [viewport, setViewport] = useState({
        latitude: parseFloat(lat),
        longitude: parseFloat(lng),
        zoom: 12,
    })

    const [settings, setsettings] = useState({
        scrollZoom: false,
        mapStyle: 'mapbox://styles/mapbox/streets-v11',
    })

    const map = useRef(null)
    const [mapIsOpen, setMapIsOpen] = useState(false)
    const handleChangeMapSize = () => {
        if (!mapIsOpen) {
            map.current.scrollIntoView({ behavior: 'smooth' })
            setMapIsOpen(true)
        } else {
            setMapIsOpen(false)
        }
    }

    return (
        <div
            className={mapIsOpen ? 'map-list map-list--open' : 'map-list'}
            ref={map}
        >
            {activities && (
                <div className="map-list__container">
                    <Button
                        appearance=""
                        size="small"
                        onClick={handleChangeMapSize}
                        classProps="map-list__button"
                        icon={`${mapIsOpen ? 'clear' : 'map'}`}
                    >
                        {mapIsOpen ? 'Fermer la carte' : 'Voir sur la carte'}
                    </Button>

                    <ReactMapGL
                        {...viewport}
                        {...settings}
                        width="100%"
                        height="100%"
                        onViewportChange={(viewport) => setViewport(viewport)}
                        mapboxApiAccessToken={`${process.env.MAPBOX_API_KEY}`}
                    >
                        <NavigationControl
                            style={{
                                right: 7,
                                bottom: 7,
                            }}
                        />
                        {markerPoints[0] &&
                            markerPoints.map((marker, index) => {
                                return (
                                    <CustomMarker
                                        key={`marker-${index}`}
                                        marker={marker}
                                        isLogged={isLogged}
                                        showLoginModal={showLoginModal}
                                    />
                                )
                            })}
                    </ReactMapGL>
                </div>
            )}
        </div>
    )
}

MapList.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    showLoginModal: PropTypes.func.isRequired,
    activities: PropTypes.array.isRequired,
    lat: PropTypes.string.isRequired,
    lng: PropTypes.string.isRequired,
    userActivitiesIds: PropTypes.array.isRequired,
    userActivitiesCreatorIds: PropTypes.array.isRequired,
}

export default MapList
