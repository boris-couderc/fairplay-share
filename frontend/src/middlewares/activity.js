import axios from 'axios'

import {
    FETCH_ACTTIVITY,
    saveActivity,
    JOIN_ACTIVITY,
    QUIT_ACTIVITY,
    saveJoinActivity,

    updateStatus,
    errorStatus,
} from 'src/actions/activity'

import { saveUserPoints, logOut } from 'src/actions/login'

const activities = (store) => (next) => (action) => {
    const { activity } = store.getState().activity
    const { user } = store.getState().login

    const { moreResults } = store.getState()
    const page = moreResults.page

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

            console.log('user.id',user.id, activity.id);

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
                    console.log('activité rejointe', response);

                    //store.dispatch(updateStatus('+'))
                    
                    store.dispatch(saveJoinActivity(response.data.activity))
                    store.dispatch(saveUserPoints(response.data.user))
                    

                })
                .catch((error) => {
                    console.log(error)
                    if (error.response.status === 401) {
                        store.dispatch(logOut())
                    } else {
                        store.dispatch(errorStatus())
                    }
                    console.log('error', error)
                })
            break



        case QUIT_ACTIVITY:
            if (!user.pseudo) {
                console.error(
                    'ERROR il faut être connecté pour quitter une activité',
                )
                break
            }
            axios
                .post(
                    `${process.env.API_URL}/api/activity/quit`,
                    {
                        id: details.id,
                        pseudo: user.pseudo,
                    },
                    { withCredentials: true },
                )
                .then((response) => {
                    // console.log('activité quittée', response);
                    store.dispatch(updateStatus('-'))
                    // store.dispatch(fetchUserActivities())
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        store.dispatch(logOut())
                    } else {
                        store.dispatch(errorStatus())
                    }
                    console.log('error', error.response.data)
                })
            break

        default:
            next(action)
    }
}

export default activities
