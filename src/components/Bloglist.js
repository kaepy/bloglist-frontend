//import React from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'


const Bloglist = ({ user, blogs, logout, addBlog, newTitle, newAuthor, newUrl, handleTitleChange, handleAuthorChange, handleUrlChange }) => {

  return (
    <div>
    <p>{user.name} logged in <button onClick={logout}>logout</button></p>
    { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
    }
    <BlogForm addBlog={addBlog} newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange} />
    </div>
  )
}

export default Bloglist