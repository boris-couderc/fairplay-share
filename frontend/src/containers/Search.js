import { connect } from 'react-redux';
import Search from 'src/components/Search';
import {
  fetchActivitiesByLocalisation, 
  fetchActivitiesByLocalisationAndSports
} from 'src/actions/search';

const mapStateToProps = (state) => ({
  activities: state.search.activities,
  pageValue: state.moreResults.page,
  count: state.search.count,
});

const mapDispatchToProps = (dispatch) => ({
  fetchActivitiesByLocalisation: (query) => {
    dispatch(fetchActivitiesByLocalisation(query));
  },
  fetchActivitiesByLocalisationAndSports: (query) => {
    dispatch(fetchActivitiesByLocalisationAndSports(query));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
