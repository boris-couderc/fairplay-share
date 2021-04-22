import {
    SAVE_LOGIN_ERROR,
    CLEAR_LOGIN_ERROR,
    SAVE_LOGGED_USER,
    LOG_OUT,
    SAVE_USER_POINTS,
    CHECK_LOCAL_STORAGE_USER,
    SAVE_CHECK_LOCAL_STORAGE_USER,
} from 'src/actions/login'

const initialState = {
    isLogged: false,
    user: {},
    isLoading: false,
    error: false,
    isCheckedLocalStorage: false,
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
                isLogged: true,
                isCheckedLocalStorage: true,
                user: action.user,
            }
        case LOG_OUT:
            return {
                ...state,
                error: false,
                isLogged: false,
                isCheckedLocalStorage: true,
                user: {},
            }
        case SAVE_USER_POINTS:
            return {
                ...state,
                user: action.data,
            }
        case CHECK_LOCAL_STORAGE_USER:
            return {
                ...state,
                isLoading: true,
            }
        case SAVE_CHECK_LOCAL_STORAGE_USER:
            return {
                ...state,
                isLoading: false,
                isCheckedLocalStorage: true,
            }
        default:
            return state
    }
}

export default login
