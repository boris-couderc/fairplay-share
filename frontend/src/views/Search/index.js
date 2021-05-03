import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import View from 'src/components/View'
import ScrollToTop from 'src/components/ScrollToTop'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import SearchBar from 'src/containers/SearchBar'
import Filter from 'src/containers/Filter';
import MapList from 'src/containers/MapList';
import CardsGrid from 'src/components/CardsGrid'
import Loader from 'src/components/Loader'
import Card from 'src/containers/Card'

import './style.scss'

import imgNoResult from 'src/assets/images/noActivities.svg'

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const Search = ({
    activities,
    fetchActivitiesByLocalisation,
    fetchActivitiesByLocalisationAndSports,
    activitiesLoaded,
 
    count,

    loaded,
    paginationReset,

    userActivitiesIds,
    userActivitiesCreatorIds,

    moreActivitiesisLoading,

    clearSearchedActivities,
    changeInputValueSearchBar,
}) => {
    const query = useQuery()
    const queryString = query.get('query')
    const lat = query.get('lat')
    const lng = query.get('lng')
    const sports = query.get('sports')


    // control to avoid display jump when filter change
    const [firstMapDisplayForLocalisation, setfirstMapDisplayForLocalisation] = useState(true)

    useEffect(() => {
        setfirstMapDisplayForLocalisation(true)
        return () => {
            setfirstMapDisplayForLocalisation(true)
            clearSearchedActivities()
            changeInputValueSearchBar('')
        }
    }, [])

    useEffect(() => {
        setfirstMapDisplayForLocalisation(true)
    }, [lat, lng, queryString])

    useEffect(() => {
        loadActivities(1)
    }, [lat, lng, queryString, sports])

    const [currentPage, setCurrentPage] = useState(1)

    const loadActivities = (page) => {
        console.log('loadActivities', currentPage, ' / ', page)

        if (sports) {
            setfirstMapDisplayForLocalisation(false)
            fetchActivitiesByLocalisationAndSports({
                queryString,
                lat,
                lng,
                sports,
                page,
            })
        } else {
            if(page>1) {
                setfirstMapDisplayForLocalisation(false)
            }
            fetchActivitiesByLocalisation({ 
                queryString, 
                lat, 
                lng,
                page,
            })
        }
        setCurrentPage(page)
    }

    const displayMap = () => {
        if (!firstMapDisplayForLocalisation || activitiesLoaded && activities.length > 0) {
            return true
        } else {
            return false
        }
    }

    return (
        <View layoutClass="search">
            <ScrollToTop />
            <Wrapper>
                <SearchBar />
                <Heading el="h1" like="h3">
                    Prochaines activités proche de : <span className="u-color-primary">{queryString}</span>
                </Heading>
                <Filter />
                {displayMap() && ( 
                    <MapList 
                        lat={lat} 
                        lng={lng}
                    />
                )}
                {!activitiesLoaded ? (  
                    <Loader classProps="u-margin-3" />
                ) : ( 
                    <>
                        {activities.length > 0 ? (
                            <>
                                <CardsGrid>
                                    {activities.map((activity) => {
                                        if (
                                            userActivitiesCreatorIds.includes(activity.id)
                                        ) {
                                            return (
                                                <Card
                                                    key={`card-${activity.id}`}
                                                    activity={activity}
                                                    loggedUserRole="creator"
                                                />
                                            )
                                        } else if (
                                            userActivitiesIds.includes(activity.id)
                                        ) {
                                            return (
                                                <Card
                                                    key={`card-${activity.id}`}
                                                    activity={activity}
                                                    loggedUserRole="participant"
                                                />
                                            )
                                        } else {
                                            return (
                                                <Card
                                                    key={`card-${activity.id}`}
                                                    activity={activity}
                                                />
                                            )
                                        }
                                    })}
                                </CardsGrid>

                                {activities.length < count ? (
                                    <div className="u-text-center u-margin-top-3">
                                        {moreActivitiesisLoading && (
                                            <Loader classProps="u-margin-3" />
                                        )}
                                        <Button
                                            appearance="primary"
                                            onClick={()=>{loadActivities(currentPage + 1)}}
                                        >
                                            Voir plus d'activités
                                        </Button>
                                    </div>
                                ) : (
                                    <></>
                                )}

                            </>
                        ) : (
                            <div className="search__no-result">
                                <Heading el="p" like="h6">
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
                                    className="search__no-result-img"
                                />
                            </div>
                        )}
                    </>
                )}
            </Wrapper>
        </View>
    )
}

Search.propTypes = {
    activities: PropTypes.array.isRequired,
    fetchActivitiesByLocalisation: PropTypes.func.isRequired,
    fetchActivitiesByLocalisationAndSports: PropTypes.func.isRequired,
    activitiesLoaded: PropTypes.bool.isRequired,
    activitiesIsLoading: PropTypes.bool.isRequired,

    //pageZ: PropTypes.number.isRequired,
    
    count: PropTypes.number.isRequired,

    userActivitiesIds: PropTypes.array.isRequired,
    userActivitiesCreatorIds: PropTypes.array.isRequired,

    paginationReset: PropTypes.func.isRequired,

    clearSearchedActivities: PropTypes.func.isRequired,
}

export default Search
