import React from 'react'
import { connect } from 'react-redux'
import agent from '../../agent'
import ArticleList from '../ArticleList'

const mapStateToProps = state => ({
  ...state.articleList,
  token: state.common.token,
})

const mapDispatchToProps = dispatch => ({
  onTabClick: (payload, tab) => dispatch({ type: 'CHANGE_TAB', payload, tab }),
  onSetPage: (p, tab) => dispatch({
    type: 'SET_PAGE', 
    page: p,
    payload: tab === 'feed' ? agent.Articles.feed(p) : agent.Articles.all(p),
  }),
})

const YourFeedTab = props => {
  if (props.token) {

    const clickHandler = ev => {
      ev.preventDefault()
      props.onTabClick(agent.Articles.feed(), 'feed')
    }

    return (
      <li className="nav-item">
        <a 
          href=""
          className={ props.tab === 'feed' ? 'nav-link active' : 'nav-link' }
          onClick={clickHandler}
        >
          Your Feed
        </a>
      </li>
    )
  }

  return null
}

const GlobalTab = props => {

  const clickHandler = ev => {
    ev.preventDefault()
    props.onTabClick(agent.Articles.all(), 'all')
  }

  return (
    <li className="nav-item">
      <a 
        href=""
        className={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}
      >
        Global Feed
      </a>
    </li>
  )
}

const TagFilterTab = props => {
  if (!props.tag) {
    return null
  }

  return (
    <li className="nav-item">
      <a className="nav-link active" href="">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </li>
  )
}

const MainView = props => {
  const onSetPage = page => props.onSetPage(page, props.tab)

  return (
    <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

          <YourFeedTab 
            token={props.token} 
            tab={props.tab}
            onTabClick={props.onTabClick}
          />

          <GlobalTab tab={props.tab} onTabClick={props.onTabClick} />

          <TagFilterTab tag={props.tag} />

        </ul>

        <ArticleList 
          articles={props.articles}
          articlesCount={props.articlesCount}
          currentPage={props.currentPage}
          onSetPage={onSetPage}
        />

      </div>
    </div>
  )
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(MainView)
