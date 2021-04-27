import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation, useHistory } from 'react-router-dom'

import Button from 'src/components/Button'

import sports from 'src/assets/sports/sports'

import './style.scss'

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const Filter = ({ fetchFilterSportsByLocalisation, sportsList }) => {
    const [sportsFilter, setSportsFilter] = useState([])

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
        fetchFilterSportsByLocalisation({ lat, lng })
    }, [lat, lng])

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
    }, [sportsList])

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
            )}&query=${queryString}`,
        )
    }

    const handleClearFilter = () => {
        setSportsFilter(
            sportsFilter.map((sport) => ({
                ...sport,
                isChecked: false,
            })),
        )
        history.push(`/search?lat=${lat}&lng=${lng}&query=${queryString}`)
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
                        <Button
                            appearance="primary"
                            size="small"
                            onClick={handleOnClick}
                            classProps="button--no-focus"
                        >
                            Filtrer
                        </Button>
                        {querySports && querySports.length > 0 && (
                            <Button
                                appearance="outline"
                                size="small"
                                onClick={handleClearFilter}
                                icon="clear"
                            >
                                Supprimer
                            </Button>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

Filter.propTypes = {
    fetchFilterSports: PropTypes.func.isRequired,
    sportsList: PropTypes.array.isRequired,
}

export default Filter
