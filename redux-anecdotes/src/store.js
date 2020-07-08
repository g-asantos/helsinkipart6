import { createStore, combineReducers, applyMiddleware } from 'redux'
import {reducer} from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'


const combinedReducer = combineReducers({
    anecdotes: reducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(
    combinedReducer,
    composeWithDevTools(applyMiddleware(thunk))
)






export default store
