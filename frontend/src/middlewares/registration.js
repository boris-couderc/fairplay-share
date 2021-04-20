import axios from 'axios'
import {
    FETCH_REGISTRATION_FORM,
    saveRegistrationError,
} from 'src/actions/registration'
import { saveLoggedUser } from 'src/actions/login'

const registration = (store) => (next) => (action) => {
    switch (action.type) {
        case FETCH_REGISTRATION_FORM: {
            const formData = action.data
            axios
                .get(
                    `http://api.positionstack.com/v1/forward?access_key=${process.env.POSITIONSTACK_API_KEY}&country=FR&limit=1&query=${formData.address} ${formData.city} ${formData.zip}`,
                )
                .then((res) => {
                    const localisation = res.data.data[0]
                    if (localisation && localisation.latitude) {
                        axios
                            .post(
                                `${process.env.API_URL}/api/registration`,
                                {
                                    pseudo: formData.pseudo,
                                    email: formData.email,
                                    password: formData.password,
                                    firstname: formData.firstname,
                                    lastname: formData.lastname,
                                    place: {
                                        city: localisation.city,
                                        number: localisation.number,
                                        street: localisation.street,
                                        postal_code: localisation.postal_code,
                                        region: localisation.region,
                                        latitude: localisation.latitude,
                                        longitude: localisation.longitude,
                                    },
                                    presentation: formData.presentation,
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
                    } else {
                        throw new Error('No address result')
                    }
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
