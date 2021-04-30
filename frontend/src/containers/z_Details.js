import { connect } from 'react-redux';
import Details from 'src/components/Details';
import { fetchDataActivity, joinActivity, quitActivity } from 'src/actions/activity';

const mapStateToProps = (state) => ({
  activity: state.details,
  userActivities: state.userActivities.activities,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDataActivity: (id) => {
    dispatch(fetchDataActivity(id));
  },
  onClickJoin: () => {
    dispatch(joinActivity());
  },
  onClickQuit: () => {
    dispatch(quitActivity());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
