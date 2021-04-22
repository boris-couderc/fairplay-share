import { 
    FETCH_USER_ACTIVITIES,
    SAVE_USER_ACTIVITIES, 
    CLEAR_USER_ACTIVITIES,
} from 'src/actions/activities'

const initialState = {
    activities: [],
    idsParticipantRole: [5, 6],
    idsCreatorRole: [8],
    loaded: false,
    isLoading: false,
}

const userActivities = (state = initialState, action = {}) => {
    switch (action.type) {

        case FETCH_USER_ACTIVITIES:
            return {
                ...initialState,
                isLoading: true,
            }

        case SAVE_USER_ACTIVITIES:
            const idsCreatorRole = []
            const idsParticipantRole = []
            const activities = action.data.activities
            activities.forEach((activity) => {
                if (activity.creator_id === action.data.user.id) {
                    idsCreatorRole.push(activity.id)
                }
                idsRegistered.push(activity.id)
            })
            return {
                ...state,
                activities: [...activities],
                idsParticipantRole,
                idsCreatorRole,
            }

        case CLEAR_USER_ACTIVITIES:
            return initialState

        default:
            return state
    }
}

export default userActivities
