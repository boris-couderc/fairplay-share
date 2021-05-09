import React from 'react'
import PropTypes from 'prop-types'

import View from 'src/components/View'
import ScrollToTop from 'src/components/ScrollToTop'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'

import dataTeam from 'src/data/team.js'

import './style.scss'

const Team = () => {
    return (
        <View layoutClass="page-test">
            <ScrollToTop />
            <Wrapper>
                <Heading el="h1">La team</Heading>
                {dataTeam.length > 0 && (
                    <ul className="team">
                        {dataTeam.map((profil) => (
                            <li className="team__card" key={profil.name}>
                                <img
                                    src={profil.img}
                                    alt={profil.name}
                                    className="team__img"
                                    width="1000"
                                    height="1000"
                                />
                                <Heading el="h2" like="h4">
                                    {profil.name}
                                </Heading>
                                <p>{profil.role}</p>
                                <Button
                                    appearance="outline"
                                    size="small"
                                    href="#"
                                >
                                    github
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}
            </Wrapper>
        </View>
    )
}

Team.propTypes = {}

export default Team
