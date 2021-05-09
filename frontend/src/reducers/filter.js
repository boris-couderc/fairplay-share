import {
    SAVE_FILTER_SPORT,
    CLEAR_FILTER
} from 'src/actions/filter'

const initialState = {
    sports: [],
}

const filter = (state = initialState, action = {}) => {
    switch (action.type) {

        case SAVE_FILTER_SPORT:
            return {
                ...state,
                sports: [...action.data],
            }

        case CLEAR_FILTER:
            return initialState

        default:
            return state
    }
}

export default filter