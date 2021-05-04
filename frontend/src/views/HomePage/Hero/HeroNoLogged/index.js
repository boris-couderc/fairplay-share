import React from 'react'
import PropTypes from 'prop-types'

import Wrapper from 'src/components/Wrapper'
import Heading from 'src/components/Heading'

import './style.scss'

// contenu voir  : https://www.decathloncoach.com/fr/home/advices/advice/courir-seul-ou-accompagne

const HeroNoLogged = (props) => {
    return (
        <div className="hero-no-logged">

            <Heading el="h1" classProps="hero-no-logged__title">
                {/* <span className="u-color-primary">Rejoins les sportif(ive)s motivé(e)s</span><br /> */}
                {/* <span className="u-color-primary">Rejoins les sportif·ive·s motivé·e·s</span><br /> */}
                <span className="u-color-primary">Rejoins les sportifs motivés</span><br />
                de ton quartier !
            </Heading>

            <Heading el="p" classProps="hero-no-logged__sub-title">
                Découvre de nouvelles activités sportives, 
                partage des passions communes,<br />
                programme des activités régulières,
                et booste ta motivation !
            </Heading>

        </div>
    )
}

HeroNoLogged.propTypes = {}

export default HeroNoLogged
