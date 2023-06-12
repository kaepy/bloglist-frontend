import React, { useState } from 'react'

const Blog = ({ user, blog, updateBlog, removeBlog }) => {
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

  const updateLikes = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)

    const newLikes = blog.likes + 1

    console.log('Blog-blog: ', blog)

    updateBlog({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newLikes,
      user: blog.user.id
    })
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)

    removeBlog({
      id: blog.id,
      title: blog.title,
    })
  }

  return (
    <div style={blogStyle}>
      {blog.title} <button onClick={() => setShowBlogDetail(!showBlogDetail)}> {showBlogDetail ? 'hide' : 'view'} </button>
      {showBlogDetail && (
        <ul style={ulStyle}>
          <li>author: {blog.author}</li>
          <li>url: {blog.url}</li>
          <li>likes: {blog.likes} <button onClick={updateLikes}>like</button></li>
          <li>user: {blog.user.username}</li>
          {user.username === blog.user.username && <li><button onClick={deleteBlog}>remove</button></li>}
        </ul>
      )}
    </div>
  )
}

export default Blog