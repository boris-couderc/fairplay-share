import React from 'react'
import PropTypes from 'prop-types'

import View from 'src/components/View'
import ScrollToTop from 'src/components/ScrollToTop'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'

import './style.scss'

const NotFound = () => {
    return (
        <View layoutClass="not-found">
            <ScrollToTop />
            <Wrapper>
                <Heading el="h1">Oups !</Heading>
                <Heading el="p" like="h4">
                    Désolé mais ce lien est introuvable !
                </Heading>
                <p>
                    Mais vous pouvez toujours revenir sur l'acceuil,
                    <br />
                    pour découvrir de nouvelles activités...
                </p>
                <div className="u-margin-top-2">
                    <Button appearance="primary" route="/">
                        Retour à l'accueil
                    </Button>
                </div>
            </Wrapper>
        </View>
    )
}

NotFound.propTypes = {}

export default NotFound
