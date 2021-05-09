import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useHistory } from 'react-router-dom'

import Button from 'src/components/Button'
import Loader from 'src/components/Loader'
import Heading from 'src/components/Heading'

import sports from 'src/assets/sports/sports'

import './style.scss'

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const initialDistance = '100'

const Filter = ({
    activitiesIsLoading,
    fetchFilterSportsByLocalisation,
    sportsList,
    clearFilter,
}) => {
    const [sportsFilter, setSportsFilter] = useState([])
    const [distance, setDistance] = useState(initialDistance)
    const [filterActive, setFilterActive] = useState(false)

    const history = useHistory()
    const query = useQuery()
    const queryString = query.get('query')
    const lat = query.get('lat')
    const lng = query.get('lng')
    let querySports = query.get('sports')
    if (querySports) {
        querySports.split(',')
    }

    useEffect(() => {
        return () => {
            clearFilter()
            setDistance(initialDistance)
        } 
    }, [])

    useEffect(() => {
        clearFilter()
        setDistance(initialDistance)
        fetchFilterSportsByLocalisation({ lat, lng })
    }, [lat, lng])

    useEffect(() => {
        if(querySports || distance != initialDistance) {
            setFilterActive(true)
        } else {
            setFilterActive(false)
        }
    }, [querySports, distance])

    useEffect(() => {
        setSportsFilter(
            sportsList.map((sport) => {
                const updatedSport = {
                    ...sport,
                    isChecked: false,
                }
                if (querySports && querySports.includes(sport.id)) {
                    updatedSport.isChecked = true
                }
                return updatedSport
            }),
        )
    }, [sportsList, querySports])

    const handleCheck = (index) => {
        const updatedSport = [...sportsFilter]
        if (updatedSport[index].isChecked) {
            updatedSport[index].isChecked = false
        } else {
            updatedSport[index].isChecked = true
        }
        setSportsFilter(updatedSport)
    }

    const handleOnClick = () => {
        const selectedSportIds = []
        sportsFilter.forEach((sport) => {
            if (sport.isChecked === true) {
                selectedSportIds.push(sport.id)
            }
        })
        history.push(
            `/search?lat=${lat}&lng=${lng}&sports=${selectedSportIds.join(
                ',',
            )}&query=${queryString}&distance=${distance}`,
        )
    }

    const handleClearFilter = () => {
        setSportsFilter(
            sportsFilter.map((sport) => ({
                ...sport,
                isChecked: false,
            })),
        )
        setDistance(initialDistance)
        setFilterActive(false)
        history.push(`/search?lat=${lat}&lng=${lng}&query=${queryString}&distance=${initialDistance}`)
    }

    return (
        <>
            {sportsFilter.length > 0 && (
                <div className="filter">
                    <ul className="filter__items">
                        {sportsFilter.map((sport, index) => (
                            <li
                                className="filter__item"
                                key={`sport${sport.id}`}
                            >
                                <input
                                    type="checkbox"
                                    name={`sport${sport.id}`}
                                    id={`sport${sport.id}`}
                                    className="filter__checkbox"
                                    checked={sport.isChecked}
                                    onChange={() => handleCheck(index)}
                                />
                                <label
                                    htmlFor={`sport${sport.id}`}
                                    className="filter__label"
                                >
                                    <img
                                        src={sports[sport.icon]}
                                        alt=""
                                        className="filter__img"
                                    />
                                    <div className="filter__item-txt">
                                        {sport.name}
                                    </div>
                                </label>
                            </li>
                        ))}
                    </ul>
                    <div className="filter__actions">
                        <div className="filter__distance">
                            <Heading el="p" classProps="u-margin-none">
                                Distance :
                            </Heading>
                            <select
                                className="input input--select input--small"
                                value={distance}
                                onChange={(e)=>setDistance(e.target.value)}
                            >
                                <option value="5">5km</option>
                                <option value="10">10km</option>
                                <option value="50">50km</option>
                                <option value="100">100km</option>
                            </select>
                        </div>
                        <div className="filter__validation">
                            <div className="filter__loader">
                                {activitiesIsLoading && (
                                    <Loader size="tiny" />
                                )}
                            </div>
                            <Button
                                appearance="primary"
                                size="small"
                                onClick={handleOnClick}
                                classProps="button--no-focus"
                            >
                                Filtrer les activités
                            </Button>
                            <Button
                                appearance="outline"
                                size="small"
                                onClick={handleClearFilter}
                                icon="clear"
                                disabled={!filterActive}
                                classProps="button--clear-filter"
                            >
                                Annuler les filtres
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

Filter.propTypes = {
    fetchFilterSports: PropTypes.func.isRequired,
    sportsList: PropTypes.array.isRequired,
    clearFilter: PropTypes.func.isRequired,
}

export default Filter
