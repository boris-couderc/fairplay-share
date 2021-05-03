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
    moreActivitiesLoaded: false,
    moreActivitiesisLoading: false,
}

const search = (state = initialState, action = {}) => {
    switch (action.type) {

        case FETCH_ACTIVITIES_BY_LOCALISATION:
            if(action.query.page > 1) {
                return {
                    ...state,
                    moreActivitiesLoaded: false,
                    moreActivitiesisLoading: true,
                }
            } else {
                return {
                    ...initialState,
                    loaded: false,
                    isLoading: true,
                }
            }

        case FETCH_ACTIVITIES_BY_LOCALISATION_AND_SPORTS:
            if(action.query.page > 1) {
                return {
                    ...state,
                    moreActivitiesLoaded: false,
                    moreActivitiesisLoading: true,
                }
            } else {
                return {
                    ...initialState,
                    loaded: false,
                    isLoading: true,
                }
            }

        case SAVE_SEARCHED_ACTIVITIES:
            console.log('SAVE_SEARCHED_ACTIVITIES')
            return {
                ...state,
                count: action.data.count,
                activities: [...action.data.activities],
                loaded: true,
                isLoading: false,
            }

        case SAVE_ALL_SEARCHED_ACTIVITIES:
            console.log('SAVE_ALL_SEARCHED_ACTIVITIES')

            console.log('state.activities', state.activities)
            console.log('action.data.activities', action.data.activities)
            
            return {
                ...state,
                count: action.data.count,
                activities: [...state.activities, ...action.data.activities],
                moreActivitiesLoaded: true,
                moreActivitiesisLoading: false,
            }

        case CLEAR_SEARCHED_ACTIVITIES:
            return initialState

        default:
            return state
    }
}

export default search
