import axios from 'axios';

import {
  FETCH_LAST_ACTIVITIES,
  FETCH_ACTIVITIES_BY_LOCALISATION,
  saveActivities
} from 'src/actions/cards';

const activities = (store) => (next) => (action) => {
  switch (action.type) {

    case FETCH_LAST_ACTIVITIES: 
      axios
        .get(`${process.env.API_URL}/activities`)
        .then((response) => {
          console.log('response last activity', response);
          store.dispatch(saveActivities(response.data));
        })
        .catch((error) => {
          console.log('error', error);
        });
      break;

    case FETCH_ACTIVITIES_BY_LOCALISATION:
      console.log('action.query ----> ', action.query);
      const lat = parseFloat(action.query.lat);
      const lng = parseFloat(action.query.lng);
      if(lat && lng) {
        console.log('FETCH_ACTIVITIES_BY_LOCALISATION');
        axios
        .get(`${process.env.API_URL}/place?lat=${lat}&lng=${lng}&page=1`)
        .then((response) => {
          store.dispatch(saveActivities(response.data));
        })
        .catch((error) => {
          console.log('error', error);
        });
      }
      break;
      
    default:
      next(action);
  }
};

export default activities;
