import { connect } from 'react-redux';
import Cards from 'src/components/Cards';

const mapStateToProps = (state) => ({
  activities: state.userActivities.activities,
  userActivitiesIds: state.userActivities.idsParticipantRole,
  userActivitiesCreatorIds: state.userActivities.idsCreatorRole,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
