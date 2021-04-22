import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from "react-router-dom"

import View from 'src/components/View'
import ScrollToTop from 'src/components/ScrollToTop'
import Wrapper from 'src/components/Wrapper'
import Button from 'src/components/Button'
import Heading from 'src/components/Heading'
import SearchBar from 'src/containers/SearchBar'
import CardsGrid from 'src/components/CardsGrid'
//import Cards from 'src/containers/Cards'

import Card from 'src/containers/Card'

import './style.scss'
import img from 'src/assets/images/noActivities.svg';

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const Search = ({
    activities,
    fetchActivitiesByLocalisation,
    fetchActivitiesByLocalisationAndSports,
    pageValue,
    count,
    loaded,
    userActivitiesIds,
    userActivitiesCreatorIds,
    paginationReset,
}) => {
    const query = useQuery();
    const queryString = query.get('query');
    const lat = query.get('lat');
    const lng = query.get('lng');
    const sports = query.get('sports');

    /*
    useEffect(() => {
        paginationReset();
    }, []);
    */

    useEffect(() => {
        if (sports) {
          fetchActivitiesByLocalisationAndSports({ queryString, lat, lng, sports });
        } else {
          fetchActivitiesByLocalisation({ queryString, lat, lng });
        }
    }, [lat, lng, queryString, sports, pageValue]);

    const cards = []
    activities.forEach((activity) => {
        if (userActivitiesCreatorIds.includes(activity.id)) {
            cards.push(
                <Card key={`card-${activity.id}`} activity={activity} loggedUserRole="creator"/>,
            )
        } else if (userActivitiesIds.includes(activity.id)) {
            cards.push(
                <Card key={`card-${activity.id}`} activity={activity} loggedUserRole="participant"/>,
            )
        } else {
            cards.push(
                <Card key={`card-${activity.id}`} activity={activity}/>,
            )
        }
    })

    return (
        <View layoutClass="search">
            <ScrollToTop />
            <Wrapper>
                <SearchBar />
                <Heading el="h1" like="h2">
                    Search
                </Heading>

                {cards.length > 0 && (
                    <CardsGrid>
                        {cards}
                    </CardsGrid>
                )}
                

                
                {/* 
                // AJOUT LOADING
                {cards.length === 0 && (
                    <>
                    <div className="search__no-result">
                        Désolé aucune activité trouvée{' '}
                    </div>
                    <img
                        src={img}
                        alt="pas d'activites"
                        className="search__no-result-img"
                    />
                    </>
                )} */}


            </Wrapper>
        </View>
    )
}

Search.propTypes = {
    activities: PropTypes.array.isRequired,
    fetchActivitiesByLocalisation: PropTypes.func.isRequired,
    fetchActivitiesByLocalisationAndSports: PropTypes.func.isRequired,
    pageValue: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    loaded: PropTypes.bool.isRequired,
    userActivitiesIds: PropTypes.array.isRequired,
    userActivitiesCreatorIds: PropTypes.array.isRequired,
    paginationReset: PropTypes.func.isRequired,
}

export default Search
