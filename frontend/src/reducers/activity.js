import {
    FETCH_ACTTIVITY,
    SAVE_ACTTIVITY,
    UPDATE_STATUS,
    ERROR_STATUS,
    CLEAR_ACTIVITY,
} from 'src/actions/activity'

const initialState = {
    /*
    classname: '',
    joinMessage: 'Rejoindre',
    quitMessage: "Quitter l'activité",
    */
    errorMessage: '',
    messages: [],
    loaded: false,
    isLoading: false,
    activity: null,
}

const activity = (state = initialState, action = {}) => {
    switch (action.type) {

        case FETCH_ACTTIVITY: 
            return {
                ...state,
                loaded: false,
                isLoading: true,
            }

        case SAVE_ACTTIVITY:
            return {
                ...state,
                loaded: true,
                isLoading: false,
                activity: { ...action.data },
            }

        case CLEAR_ACTIVITY:
            return initialState




        case ERROR_STATUS:
            return {
                ...state,
                errorMessage: 'ERROR',
            }

        case UPDATE_STATUS:
            if (action.operateur === '+') {
                return {
                    ...state,
                    participant_count: state.participant_count + 1,
                }
            }
            return {
                ...state,
                participant_count: state.participant_count - 1,
            }

        case SAVE_ACTTIVITY:
            return {
                ...initialState,
                ...action.data,
            }

        default:
            return state
    }
}

export default activity
