import { connect } from 'react-redux'
import CreateActivity from 'src/views/CreateActivity'

import {
    fetchSports,
    sendCreateActivity,
    activityCreatedChangeToFalse,
} from 'src/actions/createActivity'

const mapStateToProps = (state) => ({
    isLogged: state.login.isLogged,
    isCheckedLoginLocalStorage: state.login.isCheckedLocalStorage,
    sports: state.createActivity.sports,
    isCreated: state.createActivity.isCreated,
    error: state.createActivity.error,
})

const mapDispatchToProps = (dispatch) => ({
    fetchSports: () => {
        dispatch(fetchSports())
    },

    onSubmitCreateActivity: (data) => {
        dispatch(sendCreateActivity(data))
    },

    activityCreatedChangeToFalse: () => {
        dispatch(activityCreatedChangeToFalse())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateActivity)
