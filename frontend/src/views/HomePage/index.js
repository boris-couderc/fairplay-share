import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import View from 'src/components/View'
import ScrollToTop from 'src/components/ScrollToTop'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import SearchBar from 'src/containers/SearchBar'
import CardsGrid from 'src/components/CardsGrid'
import Card from 'src/containers/Card'
import Loader from 'src/components/Loader'

import './style.scss'

const HomePage = ({
    isLogged,
    isCheckedLoginLocalStorage,

    fetchLastActivities,
    lastActivities,
    lastActivitiesLoaded,
    lastActivitiesIsLoading,

    //fetchUserActivities,
    userActivities,
    //userActivitiesLoaded,
    //userActivitiesIsLoading,
}) => {

    useEffect(() => {
        console.log('render HomePage');
    })

    useEffect(() => {
        //paginationReset()
        
        if (!isLogged) {
            if(!lastActivitiesLoaded && !lastActivitiesIsLoading) {
                fetchLastActivities()
            }
        }
    }, [isLogged, isCheckedLoginLocalStorage])

    return (
        <View layoutClass="homepage">
            <ScrollToTop />
            <Wrapper>

                {isLogged && (
                    <div>
                        <Heading el="h1">
                            Hello logged
                        </Heading>
                    </div>
                )}
                {!isLogged && isCheckedLoginLocalStorage && (
                    <div>
                        <Heading el="h1">
                            Hello no logged
                        </Heading>
                    </div>
                )}

                <SearchBar />

                {isLogged && (
                    <>
                        <Heading el="h2" like="h3">
                            Mes prochaines activités :
                        </Heading>

                        {userActivities.length > 0 ? (
                            <CardsGrid>
                            {
                                userActivities.map((activity, index) => {
                                    return (
                                        <Card key={`card-${activity.id}`} activity={activity}/>
                                    )
                                })
                            }
                            </CardsGrid>
                        ) : (
                            <div>no activities</div>
                        )}
                    </>
                )}
                
                {!isLogged && isCheckedLoginLocalStorage && (
                    <>
                        <Heading el="h2" like="h3">
                            Explorez les dernières activités proposées :
                        </Heading>
                        {!lastActivitiesLoaded ? (
                            <Loader />
                        ) : (   
                            <>
                                {lastActivities.length > 0 ? (
                                    <CardsGrid>
                                    {
                                        lastActivities.map((activity, index) => {
                                            return (
                                                <Card key={`card-${activity.id}`} activity={activity}/>
                                            )
                                        })
                                    }
                                    </CardsGrid>
                                ) : (
                                    <div>no activities</div>
                                )}
                            </>
                        )}
                    </>
                )}

            </Wrapper>
        </View>
    )
}

HomePage.propTypes = {
    isLogged: PropTypes.bool.isRequired,
    isCheckedLoginLocalStorage: PropTypes.bool.isRequired,

    fetchLastActivities: PropTypes.func.isRequired,
    lastActivities: PropTypes.array.isRequired,
    lastActivitiesLoaded: PropTypes.bool.isRequired,
    lastActivitiesIsLoading: PropTypes.bool.isRequired,

    //fetchUserActivities: PropTypes.func.isRequired,
    userActivities: PropTypes.array.isRequired,
    //userActivitiesLoaded: PropTypes.bool.isRequired,
    //userActivitiesIsLoading: PropTypes.bool.isRequired,
}

export default HomePage
