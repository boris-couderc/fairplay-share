export const FETCH_LOGIN = 'FETCH_LOGIN'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR'
export const SAVE_CONNEXION_STATUT = 'SAVE_CONNEXION_STATUT'
export const DISCONNECT = 'DISCONNECT'
export const LOG_OUT = 'LOG_OUT'
export const GET_USER = 'GET_USER'
export const SAVE_USER_POINTS = 'SAVE_USER_POINTS'

export const CLOSE_MODAL = 'CLOSE_MODAL'

export const fetchLogin = (data) => ({
    type: FETCH_LOGIN,
    data,
})

export const loginError = () => ({
    type: LOGIN_ERROR,
})

export const clearLoginError = () => ({
    type: CLEAR_LOGIN_ERROR,
})

export const saveConnexionStatut = (data) => ({
    type: SAVE_CONNEXION_STATUT,
    data,
})

export const disconnect = () => ({
    type: DISCONNECT,
})

export const logOut = () => ({
    type: LOG_OUT,
})

export const getUser = () => ({
    type: GET_USER,
})

export const saveUserPoints = (data) => ({
    type: SAVE_USER_POINTS,
    data,
})

// a deplacer :

export const closeModal = () => ({
    type: CLOSE_MODAL,
})
