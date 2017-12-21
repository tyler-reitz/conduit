import React from 'react'

const ListPagination = props => {

  if (props.articlesCount <= 10) {
    return null
  }

  const range = []
  for (let i = 0; i < Math.ceil(props.articlesCount / 10); i++) {
    range.push(i)
  }

  const setPage = (p, tab) => props.onSetPage(p, tab)

  return (
    <nav>
      <ul className="pagination">
        {range.map(v => {
          const isCurrent = v === props.currentPage
          const handleClick = ev => {
            ev.preventDefault()
            setPage(v)
          }
          return (
            <li
              className={ isCurrent ? 'page-item active' : 'page-item' } 
              key={v.toString()}
              onClick={handleClick}
            >
              <a 
                className="page-link" 
                href=""
              >
                {v + 1}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
} 

export default ListPagination
