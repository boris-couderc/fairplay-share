import { connect } from 'react-redux';
import Details from 'src/components/Details';
import { fetchDataActivity } from 'src/actions/details';

const mapStateToProps = (state) => ({
  activity: state.details,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDataActivity: (id) => {
    dispatch(fetchDataActivity(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
