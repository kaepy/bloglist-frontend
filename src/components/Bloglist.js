import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Bloglist = ({ blogFormRef, user, blogs, logout, createBlog, updateBlog, removeBlog }) => {

  return (
    <div>
      <p>{user.name} logged in <button id="logout-button" onClick={logout}>logout</button></p>
      {blogs
        .sort((a, b) => a.likes - b.likes)
        .map(blog => <Blog key={blog.id} user={user} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />)
      }
      <Togglable buttonLabel='new blog' ref={blogFormRef}><BlogForm createBlog={createBlog} /></Togglable>
    </div>
  )
}

export default Bloglist