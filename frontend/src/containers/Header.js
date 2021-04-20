import { connect } from 'react-redux'
import Header from 'src/components/Header'
import { logOut } from 'src/actions/login'
import { clearUserActivities } from 'src/actions/cards'

const mapStateToProps = (state) => ({
    isLogged: state.login.loggedUser,
    points: state.login.user.reward_count,
    grade: state.login.user.user_grade,
})

const mapDispatchToProps = (dispatch) => ({
    onLogOut: () => {
        dispatch(logOut())
        dispatch(clearUserActivities())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
