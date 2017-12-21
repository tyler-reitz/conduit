export default (state = {}, action) => {
  const { type, payload, commentId } = action

  switch (type) {
    case 'ADD_COMMENT':
      console.log(...payload.comments)
      return {
        ...state,
        commentErrors: action.error ? payload.error : null,
        comments: action.error
          ? null
          : (state.comments || []).concat(payload.comments)
      }
    case 'DELETE_COMMENT':
      console.log(action)
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== commentId )
      }
    case 'ARTICLE_PAGE_LOAD':
      return {
        ...state,
        article: payload[0].article,
        comments: payload[1].comments
      }
    case 'ARTICLE_PAGE_UNLOAD':
      return {}
    default:
      return state
  }
}
