import {
    SAVE_SPORTS,
    SAVE_CREATE_ACTIVITY_ERROR,
    CLEAR_CREATE_ACTIVITY_ERROR,
    ACTIVITY_CREATED,
    ACTIVITY_CREATED_CHANGE_TO_FALSE,
} from 'src/actions/createActivity'

const initialState = {
    error: null,
    isCreated: false,
    sports: [],
}

const createActivity = (state = initialState, action = {}) => {
    switch (action.type) {
        
        case SAVE_SPORTS:
            return { 
                ...state, 
                sports: action.data 
            }

        case SAVE_CREATE_ACTIVITY_ERROR:
            return {
                ...state,
                error: action.error,
            }

        case CLEAR_CREATE_ACTIVITY_ERROR:
            return {
                ...state,
                error: null,
            }
        
        case ACTIVITY_CREATED:
            return { 
                ...state, 
                isCreated: true,
                error: null, 
            }

        case ACTIVITY_CREATED_CHANGE_TO_FALSE:
            return { 
                ...state, 
                isCreated: false,
            }

        default:
            return state
    }
}

export default createActivity
