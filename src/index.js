import React from 'react'
import ReactDOM from 'react-dom'
import Shell from './shell'

const el = document.getElementById('root')

ReactDOM.render(<Shell />, el)

if (module.hot) {
  module.hot.accept('./shell', () => {
    const NextApp = require('./shell').default
    ReactDOM.render(
      <NextApp />,
      el
    )
  })
}
