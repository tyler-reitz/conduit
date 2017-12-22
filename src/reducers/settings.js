export default (state = {}, action) => {
  const { type, subtype, error, payload } = action

  switch (type) {
    case 'SETTINGS_SAVED':
      return {
        ...state,
        inProgress: false,
        errors: error ? payload.errors : null
      }
    case 'ASYNC_START':
      if (subtype === 'SETTINGS_SAVED') {
        return {
          ...state,
          inProgress: true
        }
      }
    default:
      return state
  }
}
