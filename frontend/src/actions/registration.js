export const FETCH_REGISTRATION_FORM = 'FETCH_REGISTRATION_FORM';
export const SAVE_REGISTRATION_ERROR = 'SAVE_REGISTRATION_ERROR';
export const CLEAR_REGISTRATION_ERROR = 'CLEAR_REGISTRATION_ERROR';

export const fetchRegistrationForm = (data) => ({
    type: FETCH_REGISTRATION_FORM,
    data
});

export const saveRegistrationError = (error) => ({
    type: SAVE_REGISTRATION_ERROR,
    error
});

export const clearRegistrationError = () => ({
  type: CLEAR_REGISTRATION_ERROR,
});