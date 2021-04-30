import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl'

import './style.scss'
import '/src/assets/css/mapbox-gl.css'

const Map = ({ lat, lng }) => {
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

    return (
        <div className="map">
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
                <Marker
                    longitude={parseFloat(lng)}
                    latitude={parseFloat(lat)}
                >
                    <div className="marker"></div>
                </Marker>
            </ReactMapGL>
        </div>
    )
}

Map.propTypes = {
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
}

export default Map
