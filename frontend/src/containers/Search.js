import { connect } from 'react-redux'
import Search from 'src/views/Search'

import {
    fetchActivitiesByLocalisation,
    fetchActivitiesByLocalisationAndSports,
} from 'src/actions/search'
import { paginationReset } from 'src/actions/moreResults'

const mapStateToProps = (state) => ({
    activities: state.search.activities,
    pageValue: state.moreResults.page,

    count: state.search.count,

    activitiesLoaded: state.search.loaded,
    activitiesIsLoading: state.search.isLoading,

    userActivitiesIds: state.userActivities.idsParticipantRole,
    userActivitiesCreatorIds: state.userActivities.idsCreatorRole,
})

const mapDispatchToProps = (dispatch) => ({
    fetchActivitiesByLocalisation: (query) => {
        dispatch(fetchActivitiesByLocalisation(query))
    },
    fetchActivitiesByLocalisationAndSports: (query) => {
        dispatch(fetchActivitiesByLocalisationAndSports(query))
    },

    paginationReset: () => {
        dispatch(paginationReset())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
