export const FETCH_LOGIN = 'FETCH_LOGIN'
export const SAVE_LOGIN_ERROR = 'SAVE_LOGIN_ERROR'
export const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR'
export const SAVE_LOGGED_USER = 'SAVE_LOGGED_USER'
export const LOG_OUT = 'LOG_OUT'
export const CHECK_LOCAL_STORAGE_USER = 'CHECK_LOCAL_STORAGE_USER'
export const SAVE_CHECK_LOCAL_STORAGE_USER = 'SAVE_CHECK_LOCAL_STORAGE_USER'
export const SAVE_USER_POINTS = 'SAVE_USER_POINTS'

export const CLOSE_MODAL = 'CLOSE_MODAL'

export const fetchLogin = (data) => ({
    type: FETCH_LOGIN,
    data,
})

export const saveLoginError = () => ({
    type: SAVE_LOGIN_ERROR,
})

export const clearLoginError = () => ({
    type: CLEAR_LOGIN_ERROR,
})

export const saveLoggedUser = (user) => ({
    type: SAVE_LOGGED_USER,
    user,
})

export const logOut = () => ({
    type: LOG_OUT,
})

export const checkLocalStorageUser = () => ({
    type: CHECK_LOCAL_STORAGE_USER,
})

export const saveCheckLocalStorageUser = () => ({
    type: SAVE_CHECK_LOCAL_STORAGE_USER,
})

export const saveUserPoints = (data) => ({
    type: SAVE_USER_POINTS,
    data,
})

// a deplacer :

export const closeModal = () => ({
    type: CLOSE_MODAL,
})
