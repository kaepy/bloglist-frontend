import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Error from './components/Error'
import Bloglist from './components/Bloglist'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Console: window.localStorage
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      handleNotificationChange(`Welcome ${user.username}!`)
      setUsername('')
      setPassword('')
    } catch (exception) {
      handleErrorChange('Ups! Wrong credentials. Try again :)')
    }

  }

  const logout = () => {
    // removeItem ottaa vastaan vaan keyn
    // ei palauta promisea nii ei oo mitään awaitattavaa
    // window. ei ole pakollinen perinteisissä react appeissa (esim. frontti app), mutta sitä tarvittasiin esimerkisksi server side renderingissä. Windowin käyttö on kuitenkin yleisesti ottaen yhteensopivampi tapa joten sen käytöstä ei ole haittaakaan.
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)

    handleNotificationChange(`See you again!`)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })

    handleNotificationChange(`A new blog ${newTitle} by ${newAuthor} added`)
  }

  const handleTitleChange = (event) => {
    //console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    //console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    //console.log(event.target.value)
    setNewUrl(event.target.value)
  }

  const handleNotificationChange = (notification) => {
    setNotificationMessage(notification)
    setTimeout(() => { setNotificationMessage(null) }, 5000)
  }

  const handleErrorChange = (error) => {
    setErrorMessage(error)
    setTimeout(() => { setErrorMessage(null) }, 5000)
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notificationMessage} />
      <Error message={errorMessage} />

      {!user && <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}

      {user && <Bloglist blogFormRef={blogFormRef} user={user} blogs={blogs} logout={logout} addBlog={addBlog} newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} handleUrlChange={handleUrlChange} />}

    </div>
  )
}

export default App