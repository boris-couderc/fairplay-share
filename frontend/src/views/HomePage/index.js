import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import View from 'src/components/View'
import ScrollToTop from 'src/components/ScrollToTop'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import SearchBar from 'src/containers/SearchBar'

import './style.scss'

const HomePage = ({
    isLogged,
    isLoadingUser,
    isCheckedLoginLocalStorage,
    
    fetchLastActivities,
}) => {
    useEffect(() => {
        console.log('render HomePage');

        console.log('test', isLogged, isCheckedLoginLocalStorage);
    })

    useEffect(() => {
        //paginationReset()
        /*
        if (!isLogged) {
            fetchLastActivities()
        }
        */

        if(!isLogged && isCheckedLoginLocalStorage) {
            console.log('-------> fetchLastActivities');
        }

    }, [isLogged, isCheckedLoginLocalStorage])


    return (
        <View layoutClass="homepage">
            <ScrollToTop />
            <Wrapper>

                {isLogged && (
                    // <Heading el="h1">Homepage LOGGED</Heading>
                    <div className="logged"></div>
                )}
                
                {!isLogged && isCheckedLoginLocalStorage && (
                    <div className="nologged"></div>
                    // <Heading el="h1">Homepage</Heading>
                )}

                <SearchBar />

                {isLogged && (
                    <div>user activities</div>
                )}
                
                {!isLogged && isCheckedLoginLocalStorage && (
                    <div>last activities</div>
                )}

            </Wrapper>
        </View>
    )
}

HomePage.propTypes = {
    //isLogged: PropTypes.bool.isRequired,
}

export default HomePage
