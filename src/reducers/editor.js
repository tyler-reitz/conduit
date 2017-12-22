export default (state = {}, action) => {
  switch (action.type) {
    case 'EDITOR_PAGE_LOADED':
      if (action.error) {
        return {
          ...state,
          error: action.payload
        }
      }
      
      const { 
        title, slug, description, body, tagList 
      } = action.payload.article

      return {
        ...state, 
        slug, title, description, body, tagList
      }
    case 'EDITOR_PAGE_UNLOADED':
      return {}
    case 'UPDATE_EDITOR_FIELD':
      return {
        ...state,
        [action.key]: action.value
      }
    case 'ADD_TAG':
      return {
        ...state,
        tagList: [
          ...(state.tagList ? state.tagList : []),
          ...state.tagInput.split(' ')
        ],
        tagInput: '',
      }
    case 'REMOVE_TAG':
      return {
        ...state,
        tagList: state.tagList.filter(t => t !== action.tag)
      }
    case 'ASYNC_START':
      if (action.subtype === 'ARTICLE_SUBMITTED') {
        return {
          ...state,
          inProgress: true
        }
      }
    case 'ARTICLE_SUBMITTED':
      return {
        ...state,
        inProgress: null,
        errors: action.error ? action.payload.errors : null
      }
    default:
      return state
  }
}
