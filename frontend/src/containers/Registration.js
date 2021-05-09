import { connect } from 'react-redux'
import Registration from 'src/views/Registration'
import {
    clearRegistrationError,
    sendRegistration,
} from 'src/actions/registration'

const mapStateToProps = (state) => ({
    isLogged: state.login.isLogged,
    error: state.registration.error,
})

const mapDispatchToProps = (dispatch) => ({
    onSubmitRegistrationForm: (data) => {
        dispatch(sendRegistration(data))
    },
    onClearRegistrationError: () => {
        dispatch(clearRegistrationError())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Registration)