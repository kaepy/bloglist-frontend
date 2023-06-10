//import React from 'react'
import Blog from './Blog'


const Bloglist = ({ user, blogs }) => {

  return (
    <div>
    <p>{user.name} logged in</p>
    { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
    }
    </div>
  )
}

export default Bloglist