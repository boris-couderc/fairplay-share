import { connect } from 'react-redux'
import Registration from 'src/views/Registration'
import {
    clearRegistrationError,
    fetchRegistrationForm,
} from 'src/actions/registration'

const mapStateToProps = (state) => ({
    isLogged: state.login.loggedUser,
    registrationError: state.registration.error,
})

const mapDispatchToProps = (dispatch) => ({
    onSubmitRegistrationForm: (data) => {
        dispatch(fetchRegistrationForm(data))
    },
    onClearRegistrationError: () => {
        dispatch(clearRegistrationError())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
 