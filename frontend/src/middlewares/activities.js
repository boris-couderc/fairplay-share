import axios from 'axios'

import {
    FETCH_LAST_ACTIVITIES,
    saveAllActivities,
    FETCH_USER_ACTIVITIES,
    saveActivities,
    saveUserActivities,
} from 'src/actions/activities'

import {
    FETCH_ACTIVITIES_BY_LOCALISATION,
    FETCH_ACTIVITIES_BY_LOCALISATION_AND_SPORTS,
    saveSearchedActivities,
    saveAllSearchedActivities,
} from 'src/actions/search'


import { saveUserPoints, logOut } from 'src/actions/login'

const activities = (store) => (next) => (action) => {

    const { moreResults } = store.getState()
    const page = moreResults.page

    switch (action.type) {
        
        case FETCH_LAST_ACTIVITIES:
            axios
                .get(`${process.env.API_URL}/api/activities?page=${page}`)
                .then((response) => {
                    // console.log("page", page);
                    // if page > 1

                    // console.log('response.data.activities', response.data.activities);

                    if (page > 1) {
                        store.dispatch(saveAllActivities(response.data))
                    } else {
                        store.dispatch(saveActivities(response.data))
                    }
                })
                .catch((error) => {
                    console.log('error', error)
                })
                next(action)
            break


        case FETCH_USER_ACTIVITIES:
            const userId = store.getState().login.user.id
            axios
                .get(`${process.env.API_URL}/api/activities/user/${userId}`, {
                    withCredentials: true,
                })
                .then((response) => {
                    store.dispatch(saveUserActivities(response.data))
                    store.dispatch(saveUserPoints(response.data.user))
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        store.dispatch(logOut())
                    }
                    console.log('error', error)
                })
                next(action)
            break


        case FETCH_ACTIVITIES_BY_LOCALISATION:
            // console.log('action.query ----> ', action.query);
            const lat = parseFloat(action.query.lat)
            const lng = parseFloat(action.query.lng)
            if (lat && lng) {
                // console.log('FETCH_ACTIVITIES_BY_LOCALISATION');
                axios
                    .get(
                        `${process.env.API_URL}/api/place?lat=${lat}&lng=${lng}&page=${page}`,
                    )
                    .then((response) => {
                        if (page > 1) {
                            store.dispatch(
                                saveAllSearchedActivities(response.data),
                            )
                        } else {
                            store.dispatch(
                                saveSearchedActivities(response.data),
                            )
                        }
                    })
                    .catch((error) => {
                        console.log('error', error)
                    })
            }
            next(action)
            break


        case FETCH_ACTIVITIES_BY_LOCALISATION_AND_SPORTS:
            // console.log(
            //   'action.query FETCH_ACTIVITIES_BY_LOCALISATION_AND_SPORTS ----> ',
            //   action.query,
            // );
            const lat2 = parseFloat(action.query.lat)
            const lng2 = parseFloat(action.query.lng)
            const sports = action.query.sports

            // console.log(action.query.sports);

            if (lat2 && lng2 && sports) {
                // console.log('FETCH_ACTIVITIES_BY_LOCALISATION_AND_SPORTS');
                axios
                    .get(
                        `${process.env.API_URL}/api/activities/sports/?lat=${lat2}&lng=${lng2}&sports=${sports}&page=1`,
                    )
                    .then((response) => {
                        store.dispatch(saveSearchedActivities(response.data))
                    })
                    .catch((error) => {
                        console.log('error', error)
                    })
            }
            next(action)
            break


        default:
            next(action)
    }
}

export default activities
