import {
    SAVE_LOGIN_ERROR,
    CLEAR_LOGIN_ERROR,
    SAVE_LOGGED_USER,
    LOG_OUT,
    SAVE_USER_POINTS,
} from 'src/actions/login'

const initialState = {
    loggedUser: false,
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
            return {
                ...state,
                error: false,
                loggedUser: true,
                user: action.user,
            }
        case LOG_OUT:
            return initialState
        case SAVE_USER_POINTS:
            return {
                ...state,
                user: action.data,
            }
        default:
            return state
    }
}

export default login
