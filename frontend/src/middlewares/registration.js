import axios from 'axios'
import {
    SEND_REGISTRATION,
    saveRegistrationError,
} from 'src/actions/registration'
import { saveLoggedUser } from 'src/actions/login'

const registration = (store) => (next) => (action) => {
    switch (action.type) {
        case SEND_REGISTRATION: {
            const newUser = action.data
            axios
                .get(
                    `http://api.positionstack.com/v1/forward?access_key=${process.env.POSITIONSTACK_API_KEY}&country=FR&limit=1&query=${newUser.address} ${newUser.city} ${newUser.zip}`,
                )
                .then((res) => {
                    const localisation = res.data.data[0]
                    if (!localisation || !localisation.latitude) {
                        throw new Error('No address result')
                    }

                    axios
                        .post(
                            `${process.env.API_URL}/api/registration`,
                            {
                                pseudo: newUser.pseudo,
                                email: newUser.email,
                                password: newUser.password,
                                firstname: newUser.firstname,
                                lastname: newUser.lastname,
                                place: {
                                    city: localisation.city,
                                    number: localisation.number,
                                    street: localisation.street,
                                    postal_code: localisation.postal_code,
                                    region: localisation.region,
                                    latitude: localisation.latitude,
                                    longitude: localisation.longitude,
                                },
                                presentation: newUser.presentation,
                            },
                            { withCredentials: true },
                        )
                        .then((APIres) => {
                            const { user } = APIres.data
                            localStorage.fairplayUser = JSON.stringify({
                                id: user.id,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                pseudo: user.pseudo,
                                points: user.points,
                                grade: user.grade,
                            })
                            store.dispatch(saveLoggedUser(user))
                        })
                        .catch((APIerror) => {
                            const { error } = APIerror.response.data
                            store.dispatch(saveRegistrationError(error))
                        })
                })
                .catch((error) => {
                    store.dispatch(saveRegistrationError('address'))
                })

            break
        }
        default:
            next(action)
    }
}

export default registration
