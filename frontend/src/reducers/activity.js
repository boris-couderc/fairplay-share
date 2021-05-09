import {
    FETCH_ACTTIVITY,
    SAVE_ACTTIVITY,
    CLEAR_ACTIVITY,
    SEND_MESSAGE,
    SAVE_NEW_MESSAGE,
    SAVE_JOIN_ACTIVITY,
    SAVE_QUIT_ACTIVITY,
    SAVE_CANCEL_ACTIVITY,
} from 'src/actions/activity'

const initialState = { 
    activity: null,
    loaded: false,
    isLoading: false,
    messageSent: false,
    isMessageSending: false,
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


        case SAVE_JOIN_ACTIVITY:
            return {
                ...state,
                activity: {
                    ...state.activity,
                    participant_count: action.data.participantCount,
                }
            }

        case SAVE_QUIT_ACTIVITY:
            return {
                ...state,
                activity: {
                    ...state.activity,
                    participant_count: action.data.participantCount,
                }
            }

        case SAVE_CANCEL_ACTIVITY: 
            return {
                ...state,
                activity: {
                    ...state.activity,
                    activity_status_id: action.data.activityStatusId,
                }
            }

        default:
            return state
    }
}

export default activity
