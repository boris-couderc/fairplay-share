import { connect } from 'react-redux';
import Activity from 'src/views/Activity';
import {
    fetchActivity,
    joinActivity,
    quitActivity,
    clearActivity,
} from 'src/actions/activity';

const mapStateToProps = (state) => ({
    userId: state.login.user.id,
    isLogged: state.login.isLogged,
    isCheckedLoginLocalStorage: state.login.isCheckedLocalStorage,
    activity: state.activity.activity,
    activityLoaded: state.activity.loaded,
    userActivitiesLoaded: state.userActivities.loaded,
    userActivitiesParticipantRole: state.userActivities.idsParticipantRole,
    userActivitiesCreatorRole: state.userActivities.idsCreatorRole,
});

const mapDispatchToProps = (dispatch) => ({
    fetchActivity: (id) => {
        dispatch(fetchActivity(id));
    },
    clearActivity: (id) => {
        dispatch(clearActivity(id));
    },
    joinActivity: () => {
        dispatch(joinActivity());
    },
    quitActivity: () => {
        dispatch(quitActivity());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Activity);
