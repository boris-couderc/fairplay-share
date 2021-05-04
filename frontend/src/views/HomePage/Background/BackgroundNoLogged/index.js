import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'
import '../style.scss'

import Background from '../images/Background'
import Foreground from '../images/Foreground'
import ShadowWoman from '../images/ShadowWoman'
import ShadowMan from '../images/ShadowMan'
import Man from '../images/Man'
import Woman from '../images/Woman'

const BackgroundNoLogged = (props) => {
    return (
        <div className="homepage-background">


            <Background />
            <Foreground />
            <ShadowWoman />
            <ShadowMan />
            <Man />
            <Woman />

        </div>
    )
}

BackgroundNoLogged.propTypes = {}

export default BackgroundNoLogged
