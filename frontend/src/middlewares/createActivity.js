import axios from 'axios'
import {
    FETCH_SPORTS,
    saveSports,
    SEND_CREATE_ACTIVITY,
    saveCreateActivityError,
    activityCreated,
} from 'src/actions/createActivity'

//import { fetchUserActivities } from 'src/actions/activities'
 
const createActivity = (store) => (next) => (action) => {
    switch (action.type) {
        case SEND_CREATE_ACTIVITY:
            {
                const { login } = store.getState()
                const newActivity = action.data

                console.log(newActivity)

                axios
                    .get(
                        `http://api.positionstack.com/v1/forward?access_key=${process.env.POSITIONSTACK_API_KEY}&country=FR&limit=1&query=${newActivity.address} ${newActivity.city} ${newActivity.zip}`,
                    )
                    .then((response) => {
                        const localisation = response.data.data[0]
                        if (!localisation || !localisation.latitude) {
                            store.dispatch(saveCreateActivityError('address'))
                            return
                        }

                        axios
                            .post(
                                `${process.env.API_URL}/api/newactivity`,
                                {
                                    title: newActivity.title,
                                    description: newActivity.description,
                                    date: newActivity.date,
                                    time: newActivity.time,
                                    duration: newActivity.duration,
                                    min_participant: newActivity.min_participant,
                                    creator_id: login.user.id,
                                    place: {
                                        city: localisation.locality,
                                        number: localisation.number,
                                        street: localisation.street,
                                        zip_code: localisation.postal_code,
                                        region: localisation.region,
                                        latitude: localisation.latitude,
                                        longitude: localisation.longitude,
                                    },
                                    activity_status_id: 3,
                                    sport_id: newActivity.sport,
                                },
                                { withCredentials: true },
                            )
                            .then((response) => {

                                console.log('activityCreated', response)

                                store.dispatch(activityCreated())
                                //store.dispatch(fetchUserActivities())


                            })
                    })

                    .catch((error) => {
                        console.log(error)
                        if (error.response.status === 401) {
                            store.dispatch(logOut())
                        }
                    })
            }

            break

        case FETCH_SPORTS:
            axios
                .get(`${process.env.API_URL}/api/sports`, {})
                .then((response) => {
                    store.dispatch(saveSports(response.data))
                })
                .catch((error) => {
                    console.log(error)
                })
            break

        default:
            next(action)
    }
}

export default createActivity
