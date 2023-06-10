//import React from 'react'
import Blog from './Blog'


const Bloglist = ({ user, blogs, logout }) => {

  return (
    <div>
    <p>{user.name} logged in <button onClick={logout}>logout</button></p>
    { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
    }
    </div>
  )
}

export default Bloglist