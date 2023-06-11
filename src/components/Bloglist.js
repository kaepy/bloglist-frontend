//import { useRef } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Bloglist = ({ blogFormRef, user, blogs, logout, addBlog, newTitle, newAuthor, newUrl, handleTitleChange, handleAuthorChange, handleUrlChange }) => {

  //const blogFormRef = useRef()

  return (
    <div>
    <p>{user.name} logged in <button onClick={logout}>logout</button></p>
    { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
    }
    <br />
    <Togglable buttonLabel='new blog' ref={blogFormRef}><BlogForm addBlog={addBlog} newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange} /></Togglable>
    </div>
  )
}

export default Bloglist