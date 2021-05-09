export const FETCH_ACTTIVITY = 'FETCH_ACTTIVITY'
export const CLEAR_ACTIVITY = 'CLEAR_ACTIVITY'
export const SAVE_ACTTIVITY = 'SAVE_ACTTIVITY'
export const JOIN_ACTIVITY = 'JOIN_ACTIVITY'
export const SAVE_JOIN_ACTIVITY = 'SAVE_JOIN_ACTIVITY'
export const QUIT_ACTIVITY = 'QUIT_ACTIVITY'
export const SAVE_QUIT_ACTIVITY = 'SAVE_QUIT_ACTIVITY'
export const CANCEL_ACTIVITY = 'CANCEL_ACTIVITY'
export const SAVE_CANCEL_ACTIVITY = 'SAVE_CANCEL_ACTIVITY'
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

export const quitActivity = () => ({
    type: QUIT_ACTIVITY,
})

export const saveQuitActivity = (data) => ({
    type: SAVE_QUIT_ACTIVITY,
    data,
})

export const cancelActivity = () => ({
    type: CANCEL_ACTIVITY,
})

export const saveCancelActivity = (data) => ({
    type: SAVE_CANCEL_ACTIVITY,
    data,
})

export const saveNewMessage = (message) => ({
    type: SAVE_NEW_MESSAGE,
    message,
})

export const sendMessage = (message) => ({
    type: SEND_MESSAGE,
    message,
})
