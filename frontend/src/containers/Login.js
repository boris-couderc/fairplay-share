import { connect } from 'react-redux'
import Login from 'src/views/Login'
import { fetchLogin, clearLoginError } from 'src/actions/login'

const mapStateToProps = (state) => ({
    isLogged: state.login.loggedUser,
    loginError: state.login.error,
})

const mapDispatchToProps = (dispatch) => ({
    onSubmitLoginForm: (data) => {
        dispatch(fetchLogin(data))
    },
    onClearLoginError: () => {
        dispatch(clearLoginError())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
