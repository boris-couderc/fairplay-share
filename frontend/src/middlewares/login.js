import axios from 'axios'
import {
    FETCH_LOGIN,
    CHECK_LOCAL_STORAGE_USER,
    LOG_OUT,
    saveLoggedUser,
    saveLoginError,
    saveCheckLocalStorageUser,
} from 'src/actions/login'

import {
    saveUserActivities,
    fetchUserActivities,
    clearUserActivities,
} from 'src/actions/activities'

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
                    const { user, activities } = res.data
                    localStorage.fairplayUser = JSON.stringify({
                        id: user.id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        pseudo: user.pseudo,
                        points: user.points,
                        grade: user.grade,
                    })
                    store.dispatch(saveLoggedUser(user))
                    store.dispatch(saveUserActivities({activities, user}))
                    //store.dispatch(fetchUserActivities())
                })
                .catch((error) => {
                    store.dispatch(saveLoginError())
                })
            break
        }

        case CHECK_LOCAL_STORAGE_USER:
            if (localStorage.fairplayUser) {
                const user = JSON.parse(localStorage.fairplayUser)
                store.dispatch(saveLoggedUser(user))
                store.dispatch(fetchUserActivities())
            }
            store.dispatch(saveCheckLocalStorageUser())
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
