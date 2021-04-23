import {
    SAVE_REGISTRATION_ERROR,
    CLEAR_REGISTRATION_ERROR,
} from 'src/actions/registration'

const initialState = {  
    error: null,
}

const registration = (state = initialState, action = {}) => {
    switch (action.type) {
        case SAVE_REGISTRATION_ERROR:
            return {
                ...state,
                error: action.error,
            }
        case CLEAR_REGISTRATION_ERROR:
            return {
                ...state,
                error: null,
            }
        default:
            return state
    }
} 

export default registration
