export const FETCH_SPORTS = 'FETCH_SPORTS';
export const SAVE_SPORTS = 'SAVE_SPORTS';
export const SEND_CREATE_ACTIVITY = 'SEND_CREATE_ACTIVITY';
export const SAVE_CREATE_ACTIVITY_ERROR = 'SAVE_CREATE_ACTIVITY_ERROR';
export const CLEAR_CREATE_ACTIVITY_ERROR = 'CLEAR_CREATE_ACTIVITY_ERROR';
export const ACTIVITY_CREATED = 'ACTIVITY_CREATED';
export const ACTIVITY_CREATED_CHANGE_TO_FALSE = 'ACTIVITY_CREATED_CHANGE_TO_FALSE';

export const fetchSports = () => ({
    type: FETCH_SPORTS,
});
  
export const saveSports = (data) => ({
    type: SAVE_SPORTS,
    data,
});

export const sendCreateActivity = (data) => ({
    type: SEND_CREATE_ACTIVITY,
    data,
});

export const saveCreateActivityError = (error) => ({
    type: SAVE_CREATE_ACTIVITY_ERROR,
    error,
});

export const clearCreateActivityError = () => ({
    type: CLEAR_CREATE_ACTIVITY_ERROR,
});

export const activityCreated = () => ({
  type: ACTIVITY_CREATED,
});

export const activityCreatedChangeToFalse = () => ({
  type: ACTIVITY_CREATED_CHANGE_TO_FALSE,
});

