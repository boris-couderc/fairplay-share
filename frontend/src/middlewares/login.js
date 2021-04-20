import axios from 'axios'
import {
    FETCH_LOGIN,
    GET_USER,
    LOG_OUT,
    saveLoggedUser,
    saveLoginError,
} from 'src/actions/login'

const login = (store) => (next) => (action) => {
    switch (action.type) {
        case FETCH_LOGIN: {
            const { email, password } = action.data
            axios
                .post(
                    `${process.env.API_URL}/api/connexion`,
                    {
                        email: email,
                        password: password,
                    },
                    { withCredentials: true },
                )
                .then((res) => {
                    const { user } = res.data
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
                .catch((error) => {
                    store.dispatch(saveLoginError())
                })
            break
        }

        case GET_USER:
            if (localStorage.fairplayUser) {
                const user = JSON.parse(localStorage.fairplayUser)
                store.dispatch(saveLoggedUser(user))
            }
            break

        case LOG_OUT:
            if (localStorage.fairplayUser) {
                localStorage.removeItem('fairplayUser')
            }
            next(action)
            break

        default:
            next(action)
    }
}

export default login
