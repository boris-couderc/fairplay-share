import { connect } from 'react-redux'
import Activity from 'src/views/Activity'
import {
    fetchActivity,
    joinActivity,
    quitActivity,
    cancelActivity,
    clearActivity,
} from 'src/actions/activity'
import { showLoginModal } from 'src/actions/activities'

const mapStateToProps = (state) => ({
    userId: state.login.user.id,
    isLogged: state.login.isLogged,
    isCheckedLoginLocalStorage: state.login.isCheckedLocalStorage,
    activity: state.activity.activity,
    activityLoaded: state.activity.loaded,
    userActivitiesLoaded: state.userActivities.loaded,
    userActivitiesParticipantRole: state.userActivities.idsParticipantRole,
    userActivitiesCreatorRole: state.userActivities.idsCreatorRole,
})

const mapDispatchToProps = (dispatch) => ({
    fetchActivity: (id) => {
        dispatch(fetchActivity(id))
    },
    joinActivity: () => {
        dispatch(joinActivity())
    },
    quitActivity: () => {
        dispatch(quitActivity())
    },
    cancelActivity: () => {
        dispatch(cancelActivity())
    },
    clearActivity: (id) => {
        dispatch(clearActivity(id))
    },
    showLoginModal: () => {
        dispatch(showLoginModal())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
