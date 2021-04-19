import {
    SAVE_LOGIN_ERROR,
    CLEAR_LOGIN_ERROR,
    SAVE_LOGGED_USER,
    LOG_OUT,
    SAVE_USER_POINTS,
} from 'src/actions/login'

const initialState = {
    user: {},
    error: false,
}

const login = (state = initialState, action = {}) => {
    switch (action.type) {
        case SAVE_LOGIN_ERROR:
            return {
                ...state,
                error: true,
            }
        case CLEAR_LOGIN_ERROR:
            return {
                ...state,
                error: false,
            }
        case SAVE_LOGGED_USER:
            console.log('SAVE_LOGGED_USER', action.user)
            return {
                ...state,
                error: false,
                user: action.user,
            }
        case LOG_OUT:
            return initialState
        case SAVE_USER_POINTS:
            return {
                ...state,
                error: false,
                user: action.data,
            }
        default:
            return state
    }
}

export default login
