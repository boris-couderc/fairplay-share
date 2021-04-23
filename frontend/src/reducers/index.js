import { combineReducers } from 'redux'
import lastActivities from './lastActivities'
import userActivities from './userActivities'
import login from './login'
import searchBar from './searchBar'
import loginModal from './loginModal'
import search from './search'
import details from './details'
import registration from './registration'
import createActivity from './createActivity'
import filter from './filter'
import messages from './messages'
import moreResults from './moreResults'

const globalReducer = combineReducers({
    lastActivities,
    login,
    searchBar,
    loginModal,
    search,
    details,
    registration,
    createActivity,
    userActivities,
    filter,
    messages,
    moreResults,
})

export default globalReducer
