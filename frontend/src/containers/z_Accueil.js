import { connect } from 'react-redux';
import Accueil from 'src/components/Accueil';

import { fetchLastActivities, fetchUserActivities } from 'src/actions/activities';
import { paginationReset } from 'src/actions/moreResults';

const mapStateToProps = (state) => ({
  isLogged: state.login.isLogged,
  user: state.login.user,
  userActivities: state.userActivities.activities,
  points: state.login.user.reward_count,
  registredActivities: state.userActivities.idsParticipantRole.length,
  myCreatedActivities: state.userActivities.idsCreatorRole.length,
  pageValue: state.moreResults.page,
  count: state.cards.count,
});

const mapDispatchToProps = (dispatch) => ({
  fetchLastActivities: () => {
    dispatch(fetchLastActivities());
  },

  paginationReset: ()=> {
    dispatch(paginationReset())
  },

  fetchUserActivities: () => {
    dispatch(fetchUserActivities());
  },

});

export default connect(mapStateToProps, mapDispatchToProps)(Accueil);
