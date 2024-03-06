import React from 'react'
import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>title: <input id='title' value={newTitle} onChange={event => setNewTitle(event.target.value)} placeholder='placeholder title' /></div>
        <div>author: <input id='author' value={newAuthor} onChange={event => setNewAuthor(event.target.value)} placeholder='placeholder author' /></div>
        <div>url: <input id='url' value={newUrl} onChange={event => setNewUrl(event.target.value)} placeholder='placeholder url' /></div>
        <button id="create-button" type="submit">create</button>
      </form>
      <br />
    </div>
  )
}

export default BlogForm