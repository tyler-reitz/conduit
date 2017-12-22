import React, { Component } from 'react'
import { connect } from 'react-redux'
import agent from '../agent'
import ListErrors from './ListErrors'

const mapStateToProps = state => ({
  ...state.editor
})

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: 'EDITOR_PAGE_LOADED', payload}),
  onUnload: () =>
    dispatch({ type: 'EDITOR_PAGE_UNLOADED' }),
  onUpdateField: (key, value) =>
    dispatch({ type: 'UPDATE_EDITOR_FIELD', key, value }),
  onAddTag: () =>
    dispatch({ type: 'ADD_TAG' }),
  onRemoveTag: tag =>
    dispatch({ type: 'REMOVE_TAG', tag}),
  onSubmit: payload =>
    dispatch({ type: 'ARTICLE_SUBMITTED', payload }),
})

class Editor extends Component {

  componentWillMount() {
    const { match } = this.props
    if (match.params.slug) {
     this.props.onLoad(agent.Articles.get(match.params.slug))
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match: prev } = this.props 
    const { match: next } = nextProps

    if (prev.params.slug !== next.params.slug) {
      this.props.onLoad({
        article: {
          slug: '',
          title: '',
          description: '',
          body: '',
          tagList: []
        }
      })
    }
  }

  componentWillUnmount() {
    this.props.onUnload()
  }

  updateField = key =>  ev => 
    this.props.onUpdateField(key, ev.target.value)
  
  changeTitle = this.updateField('title')
  changeDescription = this.updateField('description')
  changeBody = this.updateField('body')
  changeTagInput = this.updateField('tagInput')

  watchForEnter = ev => {
    if (ev.keyCode === 13) {
      ev.preventDefault()
      this.props.onAddTag()
    }
  }

  removeTagHandler = tag => ev => this.props.onRemoveTag(tag)

  submitForm = ev => {
    ev.preventDefault()
    const { body, description, slug, tagList, title } = this.props
    const article = { title, description, body, tagList, }

    const promise = slug
      ? agent.Articles.update({...article, slug})
      : agent.Articles.create(article)

    this.props.onSubmit(promise)
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container-page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">

              <ListErrors errors={this.props.error} />

              <form>
                <fieldset>

                  <fieldset className="form-group">
                    <input 
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Article Title"
                      value={this.props.title}
                      onChange={this.changeTitle}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input 
                      className="form-control"
                      type="text"
                      placeholder="What's this article about?"
                      value={this.props.description}
                      onChange={this.changeDescription}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea 
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      value={this.props.body}
                      onChange={this.changeBody}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input 
                      className="form-control"
                      type="text"
                      placeholder="Enter tags"
                      value={this.props.tagInput}
                      onChange={this.changeTagInput}
                      onKeyUp={this.watchForEnter}
                    />
                  </fieldset>

                  <div className="tag-list">
                    {this.props.tagList && this.props.tagList.map(tag => (
                      <span className="tag-default tag-pill" key={tag}>
                        <i className="ion-close-round" 
                          onClick={this.removeTagHandler(tag)}></i>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button 
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}
                  >
                    Publish Article
                  </button>

                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Editor)
