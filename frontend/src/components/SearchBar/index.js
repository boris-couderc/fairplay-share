import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import Button from 'src/components/Button'
import Autocomplete from './Autocomplete'

import './style.scss'

////////////////
// VOIR : https://www.robinwieruch.de/react-hooks-fetch-data

// == Composant
const SearchBar = ({
    inputValue,
    changeValue,
    fetchPlacesAutoCompletion,
    fetchOnePlacesAutoCompletion,
    listAutocompleteData,
    clearListAutocompleteData,
    validLocalisation,
    changeValidLocalisation,
    errorLocalisation,
    searchQueryInProcess,
    changeSearchQueryInProcessStatut,
    showLoginModal,
    isLogged,
}) => {
    const timer = useRef(null)
    const placeInput = useRef(null)
    const history = useHistory()

    useEffect(() => {
        console.log('render SearchBar');
    })

    useEffect(() => {
        return () => {
            changeValue('')
            clearListAutocompleteData()
            clearTimeout(timer.current)
        }
    }, [])

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
        if (inputValue.length > 2) {
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

    return (
        <div className="searchbar">
            <form onSubmit={handleOnSubmit} className="searchbar__container">
                {errorLocalisation && (
                    <div className="searchbar__error">
                        Localisation non trouvée, veuillez réessayer
                    </div>
                )}
                <div className="searchbar__search">
                    <input
                        className="input searchbar__input"
                        type="text"
                        placeholder="Rehercher un lieu ..."
                        value={inputValue}
                        onChange={handleOnChange}
                        ref={placeInput}
                    />
                    <Button
                        type="submit"
                        appearance="primary"
                        size="big"
                        classProps="searchbar__search-button"
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
                Organiser une activité
            </Button>
        </div>
    )
}

SearchBar.propTypes = {
    inputValue: PropTypes.string,
    changeValue: PropTypes.func.isRequired,
    fetchPlacesAutoCompletion: PropTypes.func.isRequired,
    fetchOnePlacesAutoCompletion: PropTypes.func.isRequired,
    listAutocompleteData: PropTypes.array.isRequired,
    clearListAutocompleteData: PropTypes.func.isRequired,
    validLocalisation: PropTypes.object.isRequired,
    changeValidLocalisation: PropTypes.func.isRequired,
    errorLocalisation: PropTypes.bool.isRequired,
    searchQueryInProcess: PropTypes.bool.isRequired,
    changeSearchQueryInProcessStatut: PropTypes.func.isRequired,
    showLoginModal: PropTypes.func.isRequired,
    isLogged: PropTypes.bool.isRequired,
}

SearchBar.defaultProps = {
    inputValue: '',
}

export default SearchBar
