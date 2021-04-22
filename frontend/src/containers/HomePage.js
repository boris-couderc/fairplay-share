import { connect } from 'react-redux'
import HomePage from 'src/views/HomePage'

import {
    fetchLastActivities,
    fetchUserActivities,
} from 'src/actions/activities'
import { paginationReset } from 'src/actions/moreResults'

const mapStateToProps = (state) => ({
    isLogged: state.login.isLogged,
    isLoadingUser: state.login.isLoading,
    isCheckedLoginLocalStorage: state.login.isCheckedLocalStorage,

    lastActivities: state.lastActivities.activities,
    lastActivitiesLoaded: state.lastActivities.loaded,
    lastActivitiesIsLoading: state.lastActivities.isLoading,

    userActivities: state.userActivities.activities,
    userActivitiesLoaded: state.userActivities.loaded,
    userActivitiesIsLoading: state.userActivities.isLoading,

    /*
    points: state.login.user.reward_count,

    user: state.login.user,
    userActivities: state.userActivities.activities,

    registredActivities: state.userActivities.idsParticipantRole.length,
    myCreatedActivities: state.userActivities.idsCreatorRole.length,
    pageValue: state.moreResults.page,
    count: state.cards.count,
    */
})

const mapDispatchToProps = (dispatch) => ({
    fetchLastActivities: () => {
        dispatch(fetchLastActivities())
    },

    /*
    fetchUserActivities: () => {
        dispatch(fetchUserActivities());
    },
    */

    paginationReset: () => {
        dispatch(paginationReset())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
