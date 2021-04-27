import { connect } from 'react-redux';
import Filter from 'src/components/Filter';

import {
    fetchFilterSports,
    fetchFilterSportsByLocalisation,
    clearFilter,
} from 'src/actions/filter';

const mapStateToProps = (state) => ({
  sportsList: state.filter.sports,
  activitiesIsLoading: state.search.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchFilterSports: () => {
    dispatch(fetchFilterSports());
  },
  fetchFilterSportsByLocalisation: (query) => {
    dispatch(fetchFilterSportsByLocalisation(query));
  },
  clearFilter: () => {
    dispatch(clearFilter());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
 