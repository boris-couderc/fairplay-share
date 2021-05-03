import axios from 'axios'

import {
    FETCH_ACTTIVITY,
    saveActivity,
    JOIN_ACTIVITY,
    saveJoinActivity,
    QUIT_ACTIVITY,
    saveQuitActivity,
    CANCEL_ACTIVITY,
    saveCancelActivity,
} from 'src/actions/activity'

import {
    fetchUserActivities,
} from 'src/actions/activities'

import { saveUserPoints, logOut } from 'src/actions/login'

const activities = (store) => (next) => (action) => {
    const { activity } = store.getState().activity
    const { user } = store.getState().login
    

    switch (action.type) {
        
        case FETCH_ACTTIVITY:
            axios
                .get(`${process.env.API_URL}/api/activity/${action.id}`, {
                    withCredentials: true,
                })
                .then((response) => {
                    store.dispatch(saveActivity(response.data))
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        store.dispatch(logOut())
                    }
                    console.log('error', error)
                })
            break


        case JOIN_ACTIVITY:
            if (!user.id) {
                console.error(
                    'ERROR il faut être connecté pour rejoindre une activité',
                )
                break
            }
            axios
                .post(
                    `${process.env.API_URL}/api/activity/join`,
                    {
                        activityId: activity.id,
                        userId: user.id,
                    },
                    { withCredentials: true },
                )
                .then((response) => {
                    store.dispatch(saveJoinActivity(response.data.activity))
                    store.dispatch(fetchUserActivities())
                })
                .catch((error) => {
                    console.log(error)
                    if (error.response.status === 401) {
                        store.dispatch(logOut())
                    }
                    console.log('error', error)
                })
            break


        case QUIT_ACTIVITY:
            if (!user.id) {
                console.error(
                    'ERROR il faut être connecté pour quitter une activité',
                )
                break
            }
            axios
                .post(
                    `${process.env.API_URL}/api/activity/quit`,
                    {
                        activityId: activity.id,
                        userId: user.id,
                    },
                    { withCredentials: true },
                )
                .then((response) => {
                    store.dispatch(saveQuitActivity(response.data.activity))
                    store.dispatch(saveUserPoints(response.data.user))
                })
                .catch((error) => {
                    console.log(error)
                    if (error.response.status === 401) {
                        store.dispatch(logOut())
                    }
                    console.log('error', error)
                })
            break


        case CANCEL_ACTIVITY:
            if (!user.id) {
                console.error(
                    'ERROR il faut être connecté pour annuler une activité',
                )
                break
            }
            axios
                .post(
                    `${process.env.API_URL}/api/activity/cancel`,
                    {
                        activityId: activity.id,
                        userId: user.id,
                    },
                    { withCredentials: true },
                )
                .then((response) => {
                    store.dispatch(saveCancelActivity(response.data.activity))
                    store.dispatch(saveUserPoints(response.data.user))
                })
                .catch((error) => {
                    console.log(error)
                    if (error.response.status === 401) {
                        store.dispatch(logOut())
                    }
                })
            break


        default:
            next(action)
    }
}

export default activities
