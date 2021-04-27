import {
    SAVE_SEARCHED_ACTIVITIES,
    SAVE_ALL_SEARCHED_ACTIVITIES,
    FETCH_ACTIVITIES_BY_LOCALISATION,
    FETCH_ACTIVITIES_BY_LOCALISATION_AND_SPORTS,
    CLEAR_SEARCHED_ACTIVITIES
} from 'src/actions/search'

const initialState = {
    activities: [],
    count: 0,
    loaded: false,
    isLoading: false,
}

const search = (state = initialState, action = {}) => {
    switch (action.type) {

        case FETCH_ACTIVITIES_BY_LOCALISATION:
            return {
                ...initialState,
                loaded: false,
                isLoading: true,
            }

        case FETCH_ACTIVITIES_BY_LOCALISATION_AND_SPORTS:
            return {
                ...initialState,
                loaded: false,
                isLoading: true,
            }

        case SAVE_SEARCHED_ACTIVITIES:
            return {
                ...state,
                count: action.data.count,
                activities: [...action.data.activities],
                loaded: true,
                isLoading: false,
            }

        case SAVE_ALL_SEARCHED_ACTIVITIES:
            return {
                ...state,
                count: action.data.count,
                activities: [...state.activities, ...action.data.activities],
                loaded: true,
                isLoading: false,
            }

        case CLEAR_SEARCHED_ACTIVITIES:
            return initialState

        default:
            return state
    }
}

export default search
