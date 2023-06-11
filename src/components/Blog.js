import React, { useState } from 'react'

const Blog = ({ blog }) => {
  const [showBlogDetail, setShowBlogDetail] = useState(false)
  //console.log(showBlogDetail)

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    listStyleType: 'none'
  }

  const ulStyle = {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  }

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={() => setShowBlogDetail(!showBlogDetail)}> {showBlogDetail ? 'hide' : 'view'} </button>
      {showBlogDetail && (
        <ul style={ulStyle}>
          <li>author: {blog.author}</li>
          <li>url: {blog.url} <button>like</button></li>
          <li>likes: {blog.likes}</li>
        </ul>
      )}
    </div>
  )
}

export default Blog