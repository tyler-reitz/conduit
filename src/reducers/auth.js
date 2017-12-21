
const defaultState = {
  email: null,
  password: null
}

export const updateFieldAuth = (
  state = {},
  { type, payload: { key, value } }
) => {
  switch (type) {
    case 'UPDATE_FIELD_AUTH':
      return { ...state, [key]: value }
    default: return state
  }
}
export const handleLogin = (
  state = {},
  { type, error, payload: { errors: payloadErrors } }
) => {
  switch (type) {
    case 'LOGIN':
    case 'REGISTER':
      return {
        ...state,
        inProgress: false,
        errors: error ? payloadErrors : null
      }
    default:
      return state
  }
}

export const handleAsync = (
  state,
  { type, subtype }
) => { 
  switch (type) {
    case 'ASYNC_START':
      if (subtype === 'LOGIN' || subtype === 'REGISTER')
        return { ...state, inProgress: true }
      break
    default: return state
  }
}

export default (
  state = defaultState,
  { type, subtype, error, payload }
) => {
  switch (type) {
    case 'UPDATE_FIELD_AUTH':
      return { ...state, ...updateFieldAuth(state, { type, payload }) }
    case 'LOGIN':
    case 'REGISTER':
      return { ...state, ...handleLogin(state, { type, error, payload }) }
    case 'LOGIN_PAGE_UNLOAD':
    case 'REGISTER_PAGE_UNLOAD':
      return {}
    case 'ASYNC_START':
      return { ...state, ...handleAsync(state, { type, subtype }) }  
    default: return state      
  }
}
