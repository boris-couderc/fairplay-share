import axios from 'axios'

import {
    FETCH_LAST_ACTIVITIES,
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

    let lat, lng, sports, page
    if(action.query) {
        lat = action.query.lat ? parseFloat(action.query.lat) : null
        lng = action.query.lng ? parseFloat(action.query.lng) : null
        sports = action.query.sports ? action.query.sports : null
        page = action.query.page ? parseInt(action.query.page) : 1
    }
    
    switch (action.type) {

        case FETCH_LAST_ACTIVITIES:
            axios
                .get(`${process.env.API_URL}/api/activities`)
                .then((response) => {
                    store.dispatch(saveActivities(response.data))
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
            if (lat && lng && page) {
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
            if (lat && lng && sports && page) {
                axios
                    .get(
                        `${process.env.API_URL}/api/activities/sports/?lat=${lat}&lng=${lng}&sports=${sports}&page=${page}`,
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


        default:
            next(action)
    }
}

export default activities
