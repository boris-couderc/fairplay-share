import { connect } from 'react-redux';
import HomePage from 'src/views/HomePage';

import { fetchLastActivities, fetchUserActivities } from 'src/actions/cards';
import { paginationReset } from 'src/actions/moreResults';

const mapStateToProps = (state) => ({
  isLogged: state.login.isLogged,
  isLoadingUser: state.login.isLoading,
  isCheckedLoginLocalStorage: state.login.isCheckedLocalStorage, 
  
  /*
  points: state.login.user.reward_count,

  user: state.login.user,
  userActivities: state.userActivities.list,

  registredActivities: state.userActivities.ids.length,
  myCreatedActivities: state.userActivities.idsCreator.length,
  pageValue: state.moreResults.page,
  count: state.cards.count,
  */

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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
