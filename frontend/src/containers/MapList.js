import { connect } from 'react-redux'
import MapList from 'src/components/MapList'
import {showLoginModal} from 'src/actions/activities'

const mapStateToProps = (state) => ({
    isLogged: state.login.isLogged,
    activities: state.search.activities,
    userActivitiesIds: state.userActivities.idsParticipantRole,
    userActivitiesCreatorIds: state.userActivities.idsCreatorRole,
})

const mapDispatchToProps = (dispatch) => ({
    showLoginModal: () => {
      dispatch(showLoginModal());
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(MapList)
