export const FETCH_ACTTIVITY = 'FETCH_ACTTIVITY'
export const CLEAR_ACTIVITY = 'CLEAR_ACTIVITY'

export const SAVE_ACTTIVITY = 'SAVE_ACTTIVITY'
export const JOIN_ACTIVITY = 'JOIN_ACTIVITY'
export const SAVE_JOIN_ACTIVITY = 'SAVE_JOIN_ACTIVITY'

export const UPDATE_STATUS = 'UPDATE_STATUS'
export const ERROR_STATUS = 'ERROR_STATUS'
export const QUIT_ACTIVITY = 'QUIT_ACTIVITY'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const SAVE_NEW_MESSAGE = 'SAVE_NEW_MESSAGE'

export const fetchActivity = (id) => ({
    type: FETCH_ACTTIVITY,
    id,
})

export const clearActivity = (id) => ({
    type: CLEAR_ACTIVITY,
    id,
})

export const saveActivity = (data) => ({
    type: SAVE_ACTTIVITY,
    data,
})

export const joinActivity = () => ({
    type: JOIN_ACTIVITY,
})

export const saveJoinActivity = (data) => ({
    type: SAVE_JOIN_ACTIVITY,
    data,
})


export const updateStatus = (operateur) => ({
    type: UPDATE_STATUS,
    operateur,
})

export const errorStatus = () => ({
    type: ERROR_STATUS,
})

export const quitActivity = () => ({
    type: QUIT_ACTIVITY,
})

export const saveNewMessage = (message) => ({
    type: SAVE_NEW_MESSAGE,
    message,
})

export const sendMessage = (message) => ({
    type: SEND_MESSAGE,
    message,
})
