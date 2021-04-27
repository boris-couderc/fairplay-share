import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import View from 'src/components/View'
import ScrollToTop from 'src/components/ScrollToTop'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import SearchBar from 'src/containers/SearchBar'
import Filter from 'src/containers/Filter';
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
    activitiesIsLoading,

    pageValue,
    count,
    loaded,
    userActivitiesIds,
    userActivitiesCreatorIds,
    paginationReset,
}) => {
    const query = useQuery()
    const queryString = query.get('query')
    const lat = query.get('lat')
    const lng = query.get('lng')
    const sports = query.get('sports')

    /*
    useEffect(() => {
        paginationReset();
    }, []);
    */

    useEffect(() => {
        if (sports) {
            fetchActivitiesByLocalisationAndSports({
                queryString,
                lat,
                lng,
                sports,
            })
        } else {
            fetchActivitiesByLocalisation({ queryString, lat, lng })
        }
    }, [lat, lng, queryString, sports, pageValue])

    return (
        <View layoutClass="search">
            <ScrollToTop />
            <Wrapper>
                <SearchBar />

                <Heading el="h1" like="h3">
                    Prochaines activités proche de : <span className="u-color-primary">{queryString}</span>
                </Heading>

                <Filter />

                {!activitiesLoaded ? (  
                    <Loader />
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

    pageValue: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,

    userActivitiesIds: PropTypes.array.isRequired,
    userActivitiesCreatorIds: PropTypes.array.isRequired,

    paginationReset: PropTypes.func.isRequired,
}

export default Search
