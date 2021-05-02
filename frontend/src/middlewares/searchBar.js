import axios from 'axios'
import {
    FETCH_PLACES_AUTOCOMPLETION,
    FETCH_ONE_PLACES_AUTOCOMPLETION,
    saveAutocompletionList,
    saveValidLocalisation,
    clearListAutocompleteData,
    noResultInVerifLocalisation,
    errorApiInVerifLocalisation,
    confirmValidLocalisation,
} from 'src/actions/searchBar'

const searchBar = (store) => (next) => (action) => {
    let inputValue = store.getState().searchBar.inputValue

    switch (action.type) {
        case FETCH_PLACES_AUTOCOMPLETION:
            // ne pas relancer la recherche avec l'API si la liste autocompletion est déjà enregistré sur la même inputValue
            let lastAutocompleteQuery = store.getState().searchBar.autocomplete
                .query
            if (
                inputValue.toLowerCase().trim() !==
                lastAutocompleteQuery.toLowerCase().trim()
            ) {
                axios
                    .get(
                        `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?access_token=${process.env.MAPBOX_API_KEY}&autocomplete=true&country=fr&types=address%2Cpoi%2Cpostcode%2Clocality%2Cplace&limit=5`
                    )
                    .then((response) => {
                        const localisations = response.data.features
                        if (localisations.length > 0) {
                            const formatedLocalisations = []
                            localisations.forEach((localisation) => {
                                const name = localisation.text ? localisation.text : ''

                                const placeObj = localisation.context.find(item=>item.id.startsWith('place'))
                                const regionObj = localisation.context.find(item=>item.id.startsWith('region'))
                                const postcodeObj = localisation.context.find(item=>item.id.startsWith('postcode'))

                                const place = placeObj ? placeObj.text : ''
                                const region = regionObj ? regionObj.text : ''
                                const postcode = postcodeObj ? postcodeObj.text : ''

                                formatedLocalisations.push({
                                    query: inputValue,
                                    name: name,
                                    city: place, 
                                    reg: region,
                                    postcode: postcode,
                                    lng: localisation.geometry.coordinates[0],
                                    lat: localisation.geometry.coordinates[1],
                                })
                            })
                            store.dispatch(saveAutocompletionList(formatedLocalisations))
                        } else {
                            store.dispatch(clearListAutocompleteData())
                        }
                    })
                    .catch((error) => {
                        console.log('error', error)
                    })
            }
            next(action)
            break

        case FETCH_ONE_PLACES_AUTOCOMPLETION:
            // ne pas relancer la verif avec l'API si l'adresse à déjà été enregistré sur la même inputValue
            let lastValidLocalisationQuery = store.getState().searchBar.validLocalisation.query
            if (
                inputValue.toLowerCase().trim() !==
                lastValidLocalisationQuery.toLowerCase().trim()
            ) {
                axios
                    .get(
                        `https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?access_token=${process.env.MAPBOX_API_KEY}&autocomplete=true&country=fr&types=address%2Cpoi%2Cpostcode%2Clocality%2Cplace&limit=1`
                    )
                    .then((response) => {
                        const localisation = response.data.features[0]
                        if(localisation) {
                            const name = localisation.text ? localisation.text : ''

                            const placeObj = localisation.context.find(item=>item.id.startsWith('place'))
                            const regionObj = localisation.context.find(item=>item.id.startsWith('region'))
                            const postcodeObj = localisation.context.find(item=>item.id.startsWith('postcode'))

                            const place = placeObj ? placeObj.text : ''
                            const region = regionObj ? regionObj.text : ''
                            const postcode = postcodeObj ? postcodeObj.text : ''

                            const formatedLocalisation = {
                                query: inputValue,
                                name: name,
                                city: place, 
                                reg: region,
                                postcode: postcode,
                                lng: localisation.geometry.coordinates[0],
                                lat: localisation.geometry.coordinates[1],
                            }
                            store.dispatch(
                                saveValidLocalisation(formatedLocalisation),
                            )
                        /*
                        } else if(localisation && Array.isArray(localisation) ) {
                            console.log('ERREUR POSITION STACK ----->>>')
                            store.dispatch(errorApiInVerifLocalisation())
                        */
                        } else {
                            store.dispatch(noResultInVerifLocalisation())
                        }
                    })
                    .catch((error) => {
                        console.log('error', error)
                        store.dispatch(errorApiInVerifLocalisation())
                    })
            } else {
                store.dispatch(confirmValidLocalisation())
            }
            next(action)
            break

        default:
            next(action)
    }
}

export default searchBar
