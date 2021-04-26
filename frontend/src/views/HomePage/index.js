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

import imgNoResult from 'src/assets/images/noActivities.svg'

const HomePage = ({
    isLogged,
    userId,
    isCheckedLoginLocalStorage,

    fetchLastActivities,
    lastActivities,
    lastActivitiesLoaded,
    lastActivitiesIsLoading,

    //fetchUserActivities,
    userActivities,
    userActivitiesLoaded,
    //userActivitiesIsLoading,
}) => {

    useEffect(() => {
        console.log('render HomePage');
    })

    useEffect(() => {
        //paginationReset()
        
        if (!isLogged && isCheckedLoginLocalStorage) {
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
                        {!userActivitiesLoaded ? (
                            <Loader />
                        ) : (  
                            <>
                                {userActivities.length > 0 ? (
                                    <>
                                        <Heading el="h2" like="h3">
                                            Mes prochaines activités :
                                        </Heading>
                                        <CardsGrid>
                                        {
                                            userActivities.map((activity) => {
                                                return activity.creator_id == userId ? (
                                                    <Card 
                                                        key={`card-${activity.id}`} 
                                                        activity={activity} 
                                                        loggedUserRole="creator"
                                                    />
                                                ) : (
                                                    <Card 
                                                        key={`card-${activity.id}`} 
                                                        activity={activity} 
                                                        loggedUserRole="participant"
                                                    />
                                                )
                                            })
                                        }
                                        </CardsGrid>
                                    </>
                                ) : (
                                    <div className="homepage__no-result">
                                        <Heading el="h2" like="h3">
                                            Encore inscris à aucune activité ?
                                        </Heading>
                                        <Heading el="p" like="h6">
                                            Crées en une ou inscris toi vite !
                                        </Heading>
                                        <img
                                            src={imgNoResult}
                                            alt="pas d'activites"
                                            className="homepage__no-result-img"
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
                
                {!isLogged && isCheckedLoginLocalStorage && (
                    <>
                        {!lastActivitiesLoaded ? (
                            <Loader />
                        ) : (   
                            <>
                                {lastActivities.length > 0 ? (
                                    <>
                                        <Heading el="h2" like="h3">
                                            Explorez les dernières activités proposées :
                                        </Heading>
                                        <CardsGrid>
                                        {
                                            lastActivities.map((activity, index) => {
                                                return (
                                                    <Card key={`card-${activity.id}`} activity={activity}/>
                                                )
                                            })
                                        }
                                        </CardsGrid>
                                    </>
                                ) : (
                                    <div className="homepage__no-result">
                                        <Heading el="h2" like="h4">
                                            Désolé aucune activité trouvée ...
                                        </Heading>
                                        <div className="u-margin-top-2">
                                            <Button appearance="secondary" route="/creation">
                                                Proposer une activité
                                            </Button>
                                        </div>
                                        <img
                                            src={imgNoResult}
                                            alt="pas d'activites"
                                            className="homepage__no-result-img"
                                        />
                                    </div>
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
    userId: PropTypes.number,
    isCheckedLoginLocalStorage: PropTypes.bool.isRequired,

    fetchLastActivities: PropTypes.func.isRequired,
    lastActivities: PropTypes.array.isRequired,
    lastActivitiesLoaded: PropTypes.bool.isRequired,
    lastActivitiesIsLoading: PropTypes.bool.isRequired,

    //fetchUserActivities: PropTypes.func.isRequired,
    userActivities: PropTypes.array.isRequired,
    userActivitiesLoaded: PropTypes.bool.isRequired,
    //userActivitiesIsLoading: PropTypes.bool.isRequired,
}

HomePage.defaultProps = {
    userId: null,
}

export default HomePage
