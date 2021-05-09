import { 
    FETCH_LAST_ACTIVITIES,
    SAVE_ACTIVITIES, 
    SAVE_ALL_ACTIVITIES,  
    CLEAR_ACTIVITIES, 
} from 'src/actions/activities'

const initialState = {
    activities: [], 
    count: 0,
    loaded: false,
    isLoading: false,
}

const cards = (state = initialState, action = {}) => {
    switch (action.type) {

        case FETCH_LAST_ACTIVITIES:
            return {
                ...initialState,
                isLoading: true,
            }

        case SAVE_ACTIVITIES:
            return {
                ...state,
                count: action.data.count,
                activities: [...action.data.activities],
                loaded: true,
                isLoading: false,
            }

        case SAVE_ALL_ACTIVITIES:
            return {
                ...state,
                count: action.data.count,
                activities: [...state.activities, ...action.data.activities],
                loaded: true,
                isLoading: false,
            }

        case CLEAR_ACTIVITIES:
            return initialState

        default:
            return state
    }
}

export default cards
