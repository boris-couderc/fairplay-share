import React from 'react'
import PropTypes from 'prop-types'

import Wrapper from 'src/components/Wrapper'
import Heading from 'src/components/Heading'

import './style.scss'

const HeroLogged = (props) => {
    return (
        <div className="hero-logged">
            
            <Heading el="h1" classProps="hero-logged__heading">Hello logged</Heading>




        </div>
    )
}

HeroLogged.propTypes = {}

export default HeroLogged
