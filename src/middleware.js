import agent from './agent'

const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: 'ASYNC_START', subtype: action.type })
    action.payload.then(
      res => {
        action.payload = res
        store.dispatch(action)
      },
      error => {
        action.error = true
        action.payload = error.response.body 
          ? error.response.body 
          : { error: error.response.statusText }
        store.dispatch(action)
      }
    )

    return
  }

  next(action)
}

function isPromise(v) {
  return v && typeof v.then === 'function'
}

const localStorageMiddleware = store => next => action => {
  const { type, error, payload } = action

  if (type === 'REGISTER' || type === 'LOGIN') {
    if (!error) {
      const { user } = payload
      
      window.localStorage.setItem('jwt', user.token)
      agent.setToken(user.token)
    }
  } else if (type === 'LOGOUT') {
    window.localStorage.setItem('jwt', '')
    agent.setToken(null)
  }

  next(action)
}

export {
  promiseMiddleware,
  localStorageMiddleware
}
