import axios from 'axios'
import {
    FETCH_SPORTS,
    saveSports,
    SEND_CREATE_ACTIVITY,
    saveCreateActivityError,
    activityCreated,
    errorApiVerifLocalisationCreateActivity,
} from 'src/actions/createActivity'

import {
    fetchUserActivities,
} from 'src/actions/activities'
 
const createActivity = (store) => (next) => (action) => {
    switch (action.type) {

        case SEND_CREATE_ACTIVITY: 
            {
                const { login } = store.getState()
                const newActivity = action.data
                axios
                    .get(
                        `https://api.mapbox.com/geocoding/v5/mapbox.places/${newActivity.address} ${newActivity.city} ${newActivity.zip}.json?access_token=${process.env.MAPBOX_API_KEY}&autocomplete=true&country=fr&types=address%2Cpoi%2Cpostcode%2Clocality%2Cplace&limit=1`
                    )
                    .then((response) => {
                        const localisation = response.data.features[0]
                        if (!localisation) {
                            store.dispatch(saveCreateActivityError('address'))
                            return
                        }

                        console.log('localisation', localisation)

                        let name = ''
                        if(localisation.matching_text) {
                            name = localisation.matching_text
                        } else if(localisation.text) {
                            name = localisation.text
                        }

                        const placeObj = localisation.context.find(item=>item.id.startsWith('place'))
                        const regionObj = localisation.context.find(item=>item.id.startsWith('region'))
                        const postcodeObj = localisation.context.find(item=>item.id.startsWith('postcode'))

                        const place = placeObj ? placeObj.text : ''
                        const region = regionObj ? regionObj.text : ''
                        const postcode = postcodeObj ? postcodeObj.text : ''

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
                                        city: place,
                                        address: name,
                                        zip_code: postcode,
                                        region: region,
                                        longitude: localisation.geometry.coordinates[0],
                                        latitude: localisation.geometry.coordinates[1],
                                    },
                                    activity_status_id: 3,
                                    sport_id: newActivity.sport,
                                },
                                { withCredentials: true },
                            )
                            .then((response) => {
                                store.dispatch(activityCreated())
                                store.dispatch(fetchUserActivities())
                            })
                            .catch((error) => {
                                console.log(error)
                                if (error.response.status === 401) {
                                    store.dispatch(logOut())
                                }
                            })
                    })
                    .catch((error) => {
                        console.log(error)
                        if (error.response.status === 401) {
                            store.dispatch(logOut())
                        }
                        if (error.response.status === 503) {
                            //store.dispatch(logOut())
                            store.dispatch(errorApiVerifLocalisationCreateActivity())
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
