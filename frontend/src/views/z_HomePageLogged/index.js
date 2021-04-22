import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import View from 'src/components/View'
import ScrollToTop from 'src/components/ScrollToTop'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import SearchBar from 'src/containers/SearchBar'

import './style.scss'

const HomePageLogged = ({
    //isLogged,
    //fetchLastActivities,
}) => {
    useEffect(() => {
        console.log('render HomePageLogged');
    })

    useEffect(() => {
        //paginationReset()
        //fetchLastActivities()

        //console.log('render HomePageLogged');

    }, [])

    return (
        <View layoutClass="homepage">
            <ScrollToTop />
            <Wrapper>
                <Heading el="h1">HomePageLogged</Heading>
                <SearchBar />
            </Wrapper>
        </View>
    )
}

HomePageLogged.propTypes = {
    //isLogged: PropTypes.bool.isRequired,
}

export default HomePageLogged
