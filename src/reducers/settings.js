export default (state = {}, action) => {
  const { type, error, payload } = action
  
  switch (type) {
    case 'SETTINGS_SAVED':
      return {
        ...state,
        inProgress: false,
        errors: error ? payload.errors : null
      }
    case 'ASYNC_START':
      return {
        ...state,
        inProgress: true
      }
    case 'APP_LOAD':
    case 'HOME_PAGE_LOAD':
      return {
        ...state,
        inProgress: false
      }
    default:
      return state
  }
}
