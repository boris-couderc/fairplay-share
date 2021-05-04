import React from 'react'

import './style.scss'

import Background from '../images/background/Background'
import Foreground from '../images/background/Foreground'
import ShadowWoman from '../images/background/ShadowWoman'
import ShadowMan from '../images/background/ShadowMan'
import Man from '../images/background/Man'
import Woman from '../images/background/Woman'

import Background2 from '../images/background2/Background'
import Cloud from '../images/background2/Cloud'
import City from '../images/background2/City'

const BackgroundNoLogged = () => {
    return (
        <>
            <div className="homepage-background-2">
                <Background2 />
                <Cloud />
                <City />
            </div>
            <div className="homepage-background">
                <Background />
                <Foreground />
                <ShadowWoman />
                <ShadowMan />
                <Man />
                <Woman />
            </div>
        </>
    )
}

export default BackgroundNoLogged
