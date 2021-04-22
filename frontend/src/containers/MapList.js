import { connect } from 'react-redux';
import MapList from 'src/components/MapList';

const mapStateToProps = (state) => ({
  activities: state.search.activities,
  userActivitiesIds: state.userActivities.idsParticipantRole,
  userActivitiesCreatorIds: state.userActivities.idsCreatorRole,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MapList);