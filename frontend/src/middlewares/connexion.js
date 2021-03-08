import axios from 'axios';
import { FETCH_LOGIN, saveConnexionStatut } from 'src/actions/login';

const connexion = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_LOGIN: {
      const { login } = store.getState();
      axios
        .post(`${process.env.API_URL}/api/connexion`, {
          email: login.email,
          password: login.password,
        })
        .then((response) => {
          console.log('response', response.data);
          store.dispatch(saveConnexionStatut(response.data));
        })
        .catch((error) => {
          console.log('error', error);
        });
      break;
    }
    default:
      next(action);
  }
};

export default connexion;
