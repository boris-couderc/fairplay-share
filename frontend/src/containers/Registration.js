import { connect } from 'react-redux'
import Registration from 'src/views/Registration'
import {
    clearRegistrationError,
    fetchRegistrationForm,
} from 'src/actions/registration'

const mapStateToProps = (state) => ({
    userId: state.login.user.id,
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
 