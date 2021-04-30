import { connect } from 'react-redux'
import Activity from 'src/views/Activity'
import {
    fetchActivity,
    joinActivity,
    quitActivity,
    clearActivity,
} from 'src/actions/activity'

const mapStateToProps = (state) => ({
    isLogged: state.login.isLogged,
    isCheckedLoginLocalStorage: state.login.isCheckedLocalStorage,
    activity: state.activity.activity,
    activityLoaded: state.activity.loaded,
    userActivitiesIds: state.userActivities.idsParticipantRole,
    userActivitiesCreatorIds: state.userActivities.idsCreatorRole,
})

const mapDispatchToProps = (dispatch) => ({
    fetchActivity: (id) => {
        dispatch(fetchActivity(id))
    },
    clearActivity: (id) => {
        dispatch(clearActivity(id))
    },


    onClickJoin: () => {
        dispatch(joinActivity())
    },
    onClickQuit: () => {
        dispatch(quitActivity())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
