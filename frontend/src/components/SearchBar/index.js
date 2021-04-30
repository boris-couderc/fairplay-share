import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory, useLocation } from 'react-router-dom'

import Button from 'src/components/Button'
import Autocomplete from './Autocomplete'
import Loader from 'src/components/Loader'
import Icon from 'src/components/Icon'

import './style.scss'

const useQuery = () => {
    return new URLSearchParams(useLocation().search)
}

const SearchBar = ({
    isLogged,
    inputValue,
    changeValue,
    isFetchingLocalisation,
    fetchPlacesAutoCompletion,
    fetchOnePlacesAutoCompletion,
    listAutocompleteData,
    clearListAutocompleteData,
    validLocalisation,
    changeValidLocalisation,
    errorLocalisation,
    errorApiLocalisation,
    searchQueryInProcess,
    changeSearchQueryInProcessStatut,
    showLoginModal,
}) => {
    const query = useQuery()
    const queryString = query.get('query')
    const history = useHistory()
    const timer = useRef(null)
    const placeInput = useRef(null)

    const [geolocationAvailable, setGeolocationAvailable] = useState(false)
    const [geolocation, setGeolocation] = useState({})

    useEffect(() => {
        if ('geolocation' in navigator) {
            setGeolocationAvailable(true)
        } else {
            setGeolocationAvailable(false)
        }
        return () => {
            changeValue('')
            clearListAutocompleteData()
            clearTimeout(timer.current)
        }
    }, [])

    useEffect(() => {
        if(queryString) {
            changeValue(queryString)
        }
    }, [queryString])

    useEffect(() => {
        // verification que la recherche vient bien d'être lancée après la verification des coordonnées grace à l'api positionstack
        // searchQueryInProcess est à true si la lat et lng a bien été recupérée grace au midddleware et stockée dans le state
        if (searchQueryInProcess) {
            changeSearchQueryInProcessStatut()
            clearTimeout(timer.current)
            clearListAutocompleteData()
            history.push(
                `/search?lat=${validLocalisation.lat}&lng=${validLocalisation.lng}&query=${inputValue}`,
            )
        }
    }, [searchQueryInProcess])

    const handleOnChange = (e) => {
        const value = e.target.value
        changeValue(value)
        // timer pour déclencher le fetch après 1s sans onchange dans l'input
        clearTimeout(timer.current)
        timer.current = setTimeout(() => {
            // pas de réponse api (https://positionstack.com/documentation) si <= 2
            if (value.length > 2) {
                fetchPlacesAutoCompletion()
            } else {
                clearListAutocompleteData()
            }
        }, 500)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        clearTimeout(timer.current)
        if(inputValue === 'ma position' && geolocation.lat && geolocation.lng) {
            clearListAutocompleteData()
            history.push(
                `/search?lat=${geolocation.lat}&lng=${geolocation.lng}&query=${inputValue}`,
            )
        } else if (inputValue.length > 2) {
            clearListAutocompleteData()
            fetchOnePlacesAutoCompletion()
        }
    }

    const handleClickItemAutocompletion = (index) => {
        clearTimeout(timer.current)
        changeValidLocalisation(index)
        clearListAutocompleteData()
        placeInput.current.focus()
    }

    const handleClickCreateActivity = (e) => {
        e.preventDefault()
        if (isLogged) {
            history.push(`/creation`)
        } else {
            showLoginModal()
        }
    }

    const handleGetGps = (e) => {
        console.log('handleGetGps');
        e.preventDefault()
        const geolocalisationSuccess = (pos) => {
            changeValue('ma position')
            clearTimeout(timer.current)
            clearListAutocompleteData()
            setGeolocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            })
        }
        navigator.geolocation.getCurrentPosition(geolocalisationSuccess)
    }

    return (
        <div className="searchbar">
            <form onSubmit={handleOnSubmit} className="searchbar__container">
                {errorLocalisation && (
                    <div className="searchbar__error">
                        <Icon
                            name="pin-off"
                            classProps="searchbar__error-icon"
                        />
                        Localisation non trouvée, veuillez réessayer
                    </div>
                )}
                {errorApiLocalisation && (
                    <div className="searchbar__error">
                        <Icon
                            name="pin-off"
                            classProps="searchbar__error-icon"
                        />
                        Erreur positionstackAPI, veuillez réessayer
                    </div>
                )}
                <div className="searchbar__search">
                    <div className="searchbar__input-loader">
                        {isFetchingLocalisation && (
                            <Loader classProps="searchbar__loader" />
                        )}
                        {!isFetchingLocalisation && geolocationAvailable && (
                            <div
                                className="searchbar__gps"
                                onClick={handleGetGps}
                            >
                                <Icon name="gps" />
                            </div>
                        )}
                        <input
                            className="input searchbar__input"
                            type="text"
                            placeholder="Rehercher un lieu ..."
                            value={inputValue}
                            onChange={handleOnChange}
                            ref={placeInput}
                        />

                        {/* <select>
                            <option value="">2km</option>
                            <option value="">10km</option>
                            <option value="">50km</option>
                            <option value="">100km</option>
                        </select> */}

                    </div>
                    <Button
                        type="submit"
                        appearance="primary"
                        size="big"
                        classProps="searchbar__search-button button--no-focus"
                    >
                        Rechercher
                    </Button>
                    <Autocomplete
                        data={listAutocompleteData}
                        onClick={handleClickItemAutocompletion}
                        initialIsVisible={false}
                    />
                </div>
            </form>
            <div className="searchbar__separator">OU</div>
            <Button
                appearance="secondary"
                size="big"
                onClick={handleClickCreateActivity}
                classProps="searchbar__button"
            >
                Proposer une activité
            </Button>
        </div>
    )
}

SearchBar.propTypes = {
    inputValue: PropTypes.string,
    changeValue: PropTypes.func.isRequired,
    isFetchingLocalisation: PropTypes.bool.isRequired,
    fetchPlacesAutoCompletion: PropTypes.func.isRequired,
    fetchOnePlacesAutoCompletion: PropTypes.func.isRequired,
    listAutocompleteData: PropTypes.array.isRequired,
    clearListAutocompleteData: PropTypes.func.isRequired,
    validLocalisation: PropTypes.object.isRequired,
    changeValidLocalisation: PropTypes.func.isRequired,
    errorLocalisation: PropTypes.bool.isRequired,
    errorApiLocalisation: PropTypes.bool.isRequired,
    searchQueryInProcess: PropTypes.bool.isRequired,
    changeSearchQueryInProcessStatut: PropTypes.func.isRequired,
    showLoginModal: PropTypes.func.isRequired,
    isLogged: PropTypes.bool.isRequired,
}

SearchBar.defaultProps = {
    inputValue: '',
}

export default SearchBar
