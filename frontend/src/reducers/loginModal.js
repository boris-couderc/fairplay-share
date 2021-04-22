import { SHOW_LOGIN_MODAL } from 'src/actions/activities'
import { CLOSE_MODAL } from 'src/actions/login'

const initialState = {
    isDisplayed: false,
}

const loginModal = (state = initialState, action = {}) => {
    switch (action.type) {

        case SHOW_LOGIN_MODAL:
            return { ...state, isDisplayed: true }

        case CLOSE_MODAL:
            console.log('CLOSE_MODAL')
            return { ...state, isDisplayed: false }

        default:
            return state
    }
}

export default loginModal
