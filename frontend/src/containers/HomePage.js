import { connect } from 'react-redux'
import HomePage from 'src/views/HomePage'

import {
    fetchLastActivities,
} from 'src/actions/activities' 

const mapStateToProps = (state) => ({
    isLogged: state.login.isLogged,
    user: state.login.user,
    isCheckedLoginLocalStorage: state.login.isCheckedLocalStorage,
    lastActivities: state.lastActivities.activities,
    lastActivitiesLoaded: state.lastActivities.loaded,
    lastActivitiesIsLoading: state.lastActivities.isLoading,
    userActivities: state.userActivities,
    userActivitiesLoaded: state.userActivities.loaded,
})

const mapDispatchToProps = (dispatch) => ({
    fetchLastActivities: () => {
        dispatch(fetchLastActivities())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
