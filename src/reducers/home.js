const defaultState = {
  articles: null
}

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case 'HOME_PAGE_LOAD':
      return {
        ...state,
        tags: payload[0].tags
      }
    case 'HOME_PAGE_UNLOAD':
      return {}
    default:
      return state
  }
}
