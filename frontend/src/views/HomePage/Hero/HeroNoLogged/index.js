import React from 'react'

import Heading from 'src/components/Heading'

import './style.scss'

const HeroNoLogged = () => {
    return (
        <div className="hero-no-logged">
            <Heading el="h1" classProps="hero-no-logged__title">
                {/* <span className="u-color-primary">Rejoins les sportif(ive)s motivé(e)s</span><br /> */}
                {/* <span className="u-color-primary">Rejoins les sportif·ive·s motivé·e·s</span><br /> */}
                <span className="u-color-primary">
                    <i>Rejoins</i> <i>les</i> <i>sportifs</i> <i>motivés</i> </span> 
                    <i>de</i> <i>ton</i> <i>quartier&nbsp;!</i>
            </Heading>
            <Heading el="p" like="h6" classProps="hero-no-logged__sub-title">
                Découvre de nouvelles activités sportives, 
                partage des passions communes, 
                programme des activités régulières,
                et booste ta motivation&nbsp;!
            </Heading>
        </div>
    )
}

export default HeroNoLogged
