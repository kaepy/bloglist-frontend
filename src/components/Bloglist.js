import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Bloglist = ({ blogFormRef, user, blogs, logout, createBlog }) => {

  return (
    <div>
    <p>{user.name} logged in <button onClick={logout}>logout</button></p>
    { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
    }
    <br />
    <Togglable buttonLabel='new blog' ref={blogFormRef}><BlogForm createBlog={createBlog} /></Togglable>
    </div>
  )
}

export default Bloglist