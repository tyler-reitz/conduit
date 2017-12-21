import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { promiseMiddleware, localStorageMiddleware } from './middleware'

import home from './reducers/home'
import common from './reducers/common'
import auth from './reducers/auth'
import settings from './reducers/settings'
import article from './reducers/article'
import articleList from './reducers/articleList'
import profile from './reducers/profile.js'

const reducer = combineReducers({
  article,
  articleList,
  home,
  common,
  auth,
  settings,
  profile,
})

const middlewares = [ promiseMiddleware, localStorageMiddleware ] 

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(...middlewares)
))

export default store

