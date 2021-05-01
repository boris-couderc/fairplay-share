import {
    FETCH_ACTTIVITY,
    SAVE_ACTTIVITY,
    CLEAR_ACTIVITY,
    SEND_MESSAGE,
    SAVE_NEW_MESSAGE,
    
    UPDATE_STATUS,
    ERROR_STATUS,

} from 'src/actions/activity'

const initialState = {
    /*
    classname: '',
    joinMessage: 'Rejoindre',
    quitMessage: "Quitter l'activité",
    */
    activity: null,
    loaded: false,
    isLoading: false,
    messageSent: false,
    isMessageSending: false,
    // errorMessage: '',
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
        
        case SEND_MESSAGE:
            return {
                ...state,
                messageSent: false,
                isMessageSending: true,
            }

        case SAVE_NEW_MESSAGE:
            return {
                ...state,
                activity: {
                    ...state.activity,
                    messages: [action.message, ...state.activity.messages],
                },
                messageSent: true,
                isMessageSending: false,
            }

        case CLEAR_ACTIVITY:
            return initialState

        

        /*
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
        */

        default:
            return state
    }
}

export default activity
