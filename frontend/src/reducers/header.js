import { SAVE_LOGGED_USER, LOG_OUT } from 'src/actions/login';

const initialState = {
  isLogged: false,
  //isLogged: true
};

const header = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_LOGGED_USER:
      return {
        isLogged: true,
      };
    case LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default header;
