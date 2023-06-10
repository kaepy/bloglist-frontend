import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Bloglist from './components/Bloglist'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    console.log('logging in with', username)
  }

  const logout = () => {
    // removeItem ottaa vastaan vaan keyn
    // ei palauta promisea nii ei oo mitään awaitattavaa
    // window. ei ole pakollinen perinteisissä react appeissa (esim. frontti app), mutta sitä tarvittasiin esimerkisksi server side renderingissä. Windowin käyttö on kuitenkin yleisesti ottaen yhteensopivampi tapa joten sen käytöstä ei ole haittaakaan.
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)

    console.log('logged out')
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} />

      {!user && <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />}
      
      {user && <Bloglist user={user} blogs={blogs} logout={logout} />}

    </div>
  )
}

export default App