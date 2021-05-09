import {
    FETCH_PLACES_AUTOCOMPLETION,
    FETCH_ONE_PLACES_AUTOCOMPLETION,
    CHANGE_INPUT_VALUE_SEARCHBAR,
    SAVE_VALID_LOCALISATION,
    CHANGE_VALID_LOCALISATION,
    SAVE_AUTOCOMPLETION_LIST,
    CLEAR_LIST_AUTOCOMPLETE_DATA,
    NO_RESULT_IN_VERIF_LOCALISATION,
    ERROR_API_IN_VERIFICATION_LOCALISATION,
    CONFIRM_VALID_LOCALISATION,
    CHANGE_SEARCH_QUERY_IN_PROCESS_STATUT,
} from 'src/actions/searchBar'

const initialState = {
    inputValue: '',
    validLocalisation: {
        query: '',
    },
    autocomplete: {
        query: '',
        list: [],
    },
    isFetchingLocalisation: false,
    errorLocalisation: false,
    errorApiLocalisation: false,
    searchQueryInProcess: false,
}

const searchBar = (state = initialState, action = {}) => {
    switch (action.type) {
        case FETCH_PLACES_AUTOCOMPLETION: {
            return {
                ...state,
                isFetchingLocalisation: true,
            }
        }

        case FETCH_ONE_PLACES_AUTOCOMPLETION: {
            return {
                ...state,
                isFetchingLocalisation: true,
            }
        }

        case CHANGE_INPUT_VALUE_SEARCHBAR: {
            return {
                ...state,
                errorLocalisation: false,
                errorApiLocalisation: false,
                inputValue: action.value,
            }
        }

        case SAVE_AUTOCOMPLETION_LIST: {
            return {
                ...state,
                autocomplete: {
                    query: state.inputValue,
                    list: [...action.data],
                },
                isFetchingLocalisation: false,
            }
        }

        case SAVE_VALID_LOCALISATION: {
            return {
                ...state,
                errorLocalisation: false,
                errorApiLocalisation: false,
                searchQueryInProcess: true,
                validLocalisation: {
                    ...action.data,
                },
                isFetchingLocalisation: false,
            }
        }

        case CONFIRM_VALID_LOCALISATION: {
            return {
                ...state,
                searchQueryInProcess: true,
            }
        }

        case CHANGE_SEARCH_QUERY_IN_PROCESS_STATUT: {
            return {
                ...state,
                //inputValue: '',
                searchQueryInProcess: false,
            }
        }

        case CHANGE_VALID_LOCALISATION: {
            return {
                ...state,
                errorLocalisation: false,
                errorApiLocalisation: false,
                inputValue: state.autocomplete.list[action.index].name,
                validLocalisation: {
                    ...state.autocomplete.list[action.index],
                },
            }
        }

        case CLEAR_LIST_AUTOCOMPLETE_DATA: {
            return {
                ...state,
                autocomplete: {
                    query: '',
                    list: [],
                },
                isFetchingLocalisation: false,
            }
        }

        case NO_RESULT_IN_VERIF_LOCALISATION: {
            return {
                ...state,
                errorLocalisation: true,
                errorApiLocalisation: false,
                isFetchingLocalisation: false,
            }
        }

        case ERROR_API_IN_VERIFICATION_LOCALISATION: {
            return {
                ...state,
                errorApiLocalisation: true,
                errorLocalisation: false,
                isFetchingLocalisation: false,
            }
        }

        default:
            return state
    }
}

export default searchBar
