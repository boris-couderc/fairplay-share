import {
    LOGIN_ERROR,
    CLEAR_LOGIN_ERROR,
    SAVE_CONNEXION_STATUT,
    DISCONNECT,
    SAVE_USER_POINTS,
} from 'src/actions/login'

const initialState = {
    user: {},
    error: false,
}

const login = (state = initialState, action = {}) => {
    switch (action.type) {
        case LOGIN_ERROR:
            return {
                ...state,
                error: true,
            }
        case CLEAR_LOGIN_ERROR:
            return {
                ...state,
                error: false,
            }
        case SAVE_CONNEXION_STATUT:
            return {
                ...state,
                error: false,
                user: action.data,
            }
        case DISCONNECT:
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
