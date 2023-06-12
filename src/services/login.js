import axios from 'axios'
const baseUrl = '/api/login'

// Uloskirjautuminen userilta:
// window.localStorage.removeItem('loggedNoteappUser')

// Local storagen tilan nollaus kokonaan:
// window.localStorage.clear()

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const logger = { login }
export default logger