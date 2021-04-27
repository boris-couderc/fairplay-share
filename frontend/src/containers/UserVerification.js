import { connect } from 'react-redux';
import UserVerification from 'src/components/UserVerification';
import { checkLocalStorageUser } from 'src/actions/login'

const mapStateToProps = (state) => ({
    isLogged: state.login.isLogged,
    isCheckedLoginLocalStorage: state.login.isCheckedLocalStorage,
});

const mapDispatchToProps = (dispatch) => ({
    checkLocalStorageUser: () => {
        dispatch(checkLocalStorageUser())
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserVerification);
