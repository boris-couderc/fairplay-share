import axios from 'axios';
import {
  FETCH_LOGIN, 
  GET_USER,
  saveConnexionStatut, 
  loginError,
} from 'src/actions/login';
import {
  fetchUserActivities,
} from 'src/actions/cards';

const connexion = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_LOGIN: {
      const { login } = store.getState();
      // console.log('gg');
      axios
        .post(`${process.env.API_URL}/api/connexion`, {
          email: login.email,
          password: login.password,
        })
        .then((response) => {
          // console.log('response', response.data);
          store.dispatch(saveConnexionStatut(response.data));
          store.dispatch(fetchUserActivities());

          localStorage.fairplayUser = JSON.stringify({
            firsname: response.data.firsname,
            id: response.data.id,
            lastname: response.data.lastname,
            pseudo: response.data.pseudo,
          });
        })
        .catch((error) => {
          console.log('error', error);
          store.dispatch(loginError());
        });
      break;
    }

    case GET_USER:
      if (localStorage.fairplayUser) {
        const user = JSON.parse(localStorage.fairplayUser);
        store.dispatch(saveConnexionStatut(user));
        store.dispatch(fetchUserActivities());
      }
      break;

    default:
      next(action);
  }
};

export default connexion;
