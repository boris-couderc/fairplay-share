import { connect } from 'react-redux';
import Cards from 'src/components/Cards';

const mapStateToProps = (state) => ({
  isLogged: state.login.isLogged,
  count: state.cards.count,
  activities: state.cards.activities,
  userActivitiesIds: state.userActivities.idsParticipantRole,
  userActivitiesCreatorIds: state.userActivities.idsCreatorRole,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
