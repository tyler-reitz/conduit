import React from 'react'
import agent from '../../agent'

const Tags = props => {
  if (props.tags) {
    return (
      <div className="tag-list">
        {
          props.tags.map(tag => {
            const handleClick = ev => {
              ev.preventDefault()
              props.onClickTag(agent.Articles.byTag(tag), tag)
            }

            return (
              <a
                href=""
                className="tag-default tag-pill"
                key={tag}
                onClick={handleClick}
              >
                {tag}
              </a>
            )
          })
        }
      </div>
    )
  }

  return (
    <div>…Loading Tags</div>
  )
}

export default Tags
