import React, { Component } from 'react'
import { connect } from 'react-redux'
import agent from '../../agent'

import Banner from './Banner'
import MainView from './MainView'
import Tags from './Tags'

// eslint-disable-next-line
const Promise = global.Promise

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
})

const mapDispatchToProps = dispatch => ({
  onClickTag: (payload, tag) =>
    dispatch({ type: 'APPLY_TAG_FILTER', payload, tag }),
  onLoad: (payload, tab) =>
    dispatch({ type: 'HOME_PAGE_LOAD', payload, tab }),
  onUnload: () =>
    dispatch({ type: 'HOME_PAGE_UNLOAD' }),
})

class Home extends Component {
  
  componentWillMount() {
    const { token } = this.props
    const tab = token ? 'feed' : 'all'
    const articlePromise = token
      ? agent.Articles.feed()
      : agent.Articles.all()

    this.props.onLoad(Promise.all([
      agent.Tag.getAll(),
      articlePromise
    ]), tab)

  }

  componentWillUmount() {
    this.props.onUnload()
  }

  render() {
    return (
      <div className="home-page">
        <Banner appName={this.props.appName}  />

        <div className="container page">
          <div className="row">
            <MainView />
            <div className="col-md-3">
              <div className="sidebar">
                
                <p>Popular Tags</p>

                <Tags 
                  tags={this.props.tags}
                  onClickTag={this.props.onClickTag}
                />

              </div>
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
)(Home)
