import { 
    FETCH_USER_ACTIVITIES,
    SAVE_USER_ACTIVITIES, 
    CLEAR_USER_ACTIVITIES,
} from 'src/actions/activities'

import { 
    SAVE_JOIN_ACTIVITY,
    SAVE_QUIT_ACTIVITY,
    SAVE_CANCEL_ACTIVITY,
} from 'src/actions/activity'

const initialState = {
    activities: [],
    idsParticipantRole: [],
    idsCreatorRole: [],
    loaded: false,
    isLoading: false, 
}

const userActivities = (state = initialState, action = {}) => {
    switch (action.type) {

        case FETCH_USER_ACTIVITIES:
            return {
                ...initialState,
                isLoading: true, 
                loaded: false,
            }

        case SAVE_USER_ACTIVITIES:
            const idsCreatorRole = []
            const idsParticipantRole = []
            const userActivities = action.data.activities
            userActivities.forEach((activity) => {
                if (activity.creator_id === action.data.user.id) {
                    idsCreatorRole.push(activity.id)
                } else {
                }
                idsParticipantRole.push(activity.id)
            })
            return {
                ...state,
                activities: [...userActivities],
                idsParticipantRole,
                idsCreatorRole,
                isLoading: false,
                loaded: true,
            }

        case CLEAR_USER_ACTIVITIES:
            return initialState
 
        case SAVE_JOIN_ACTIVITY:
            return {
                ...state,
                idsParticipantRole: [ ...state.idsParticipantRole, action.data.id]
            }

        case SAVE_QUIT_ACTIVITY:
            const indexActivityToSuppr = state.activities.findIndex(activity=>activity.id==action.data.id)
            const updatedActivitiesQuit = [...state.activities]
            updatedActivitiesQuit.splice(indexActivityToSuppr, 1)
            return {
                ...state,
                idsParticipantRole: state.idsParticipantRole.filter(id=>id!==action.data.id),
                activities: updatedActivitiesQuit,
            }

        case SAVE_CANCEL_ACTIVITY:
            const indexActivityToUpdate = state.activities.findIndex(activity=>activity.id==action.data.id)
            const updatedActivitiesCancel = [...state.activities]
            updatedActivitiesCancel[indexActivityToUpdate].activity_status_id = 2
            return {
                ...state,
                activities: updatedActivitiesCancel,
            }

        default:
            return state
    }
}

export default userActivities
