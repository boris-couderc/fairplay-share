import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from 'src/reducers'

import activities from 'src/middlewares/activities'
import login from 'src/middlewares/login'
import searchBar from 'src/middlewares/searchBar'
import registration from '../middlewares/registration'
import createActivity from 'src/middlewares/createActivity'
import filter from 'src/middlewares/filter'
import messages from 'src/middlewares/messages'

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(
            activities,
            searchBar,
            login,
            registration,
            createActivity,
            filter,
            messages,
        ),
    ),
)

export default store
