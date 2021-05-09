import { connect } from 'react-redux';
import Card from 'src/components/Card';
import {showLoginModal} from 'src/actions/activities'

const mapStateToProps = (state, ownProps) => ({
  isLogged: state.login.isLogged,
  ownProps,
});

const mapDispatchToProps = (dispatch) => ({
  showLoginModal: () => {
    dispatch(showLoginModal());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Card); 