import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from 'src/reducers'

import login from 'src/middlewares/login'
import registration from '../middlewares/registration'
import searchBar from 'src/middlewares/searchBar'
import filter from 'src/middlewares/filter'
import activities from 'src/middlewares/activities'
import activity from 'src/middlewares/activity'
import messages from 'src/middlewares/messages'
import createActivity from 'src/middlewares/createActivity'

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(
            login,
            registration,
            searchBar,
            filter,
            activities,
            activity,
            messages,
            createActivity,
        ),
    ),
)

export default store
