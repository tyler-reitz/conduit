const defaultState = {
  appName: 'conduit',
  token: null
}

export default (
  state = defaultState,
  { type, error, payload, token }
) => {
  switch (type) {
    case 'APP_LOAD':
      return {
        ...state,
        token,
        appLoaded: true,
        currentUser: payload ? payload.user : null
      }
    case 'REDIRECT':
      return {
        ...state,
        redirectTo: null
      }  
    case 'LOGOUT':
      return {
        ...state,
        redirectTo: '/',
        token: null,
        currentUser: null
      }
    case 'SETTINGS_SAVED':
      return {
        ...state,
        redirectTo: error ? null : '/',
        currentUser: error ? null : payload.user
      }
    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state,
        redirectTo: error ? null : '/',
        token: error ? null : payload.user.token,
        appLoaded: true,
        currentUser: payload ? payload.user : null
      }
    case 'DELETE_ARTICLE':
      return {
        ...state,
        redirectTo: '/'
      } 
    default:
      return state
  }
}
