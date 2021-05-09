export const SEND_REGISTRATION = 'SEND_REGISTRATION';
export const SAVE_REGISTRATION_ERROR = 'SAVE_REGISTRATION_ERROR';
export const CLEAR_REGISTRATION_ERROR = 'CLEAR_REGISTRATION_ERROR';

export const sendRegistration = (data) => ({
    type: SEND_REGISTRATION,
    data
});

export const saveRegistrationError = (error) => ({
    type: SAVE_REGISTRATION_ERROR,
    error
});

export const clearRegistrationError = () => ({
  type: CLEAR_REGISTRATION_ERROR,
});