import { connect } from 'react-redux'
import Header from 'src/components/Header'
import { logOut } from 'src/actions/login'
import { clearUserActivities } from 'src/actions/cards'

const mapStateToProps = (state) => ({
    isLogged: state.login.isLogged,
    points: state.login.user.points,
    grade: state.login.user.grade,
})

const mapDispatchToProps = (dispatch) => ({
    onLogOut: () => {
        dispatch(logOut())
        dispatch(clearUserActivities())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
