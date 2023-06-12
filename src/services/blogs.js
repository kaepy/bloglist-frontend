import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = { headers: { Authorization: token } }

  const response = await axios.post(baseUrl, newObject, config)

  return response.data
}

const update = async (id, newObject) => {
  const config = { headers: { Authorization: token } }

  console.log('blogs-id: ', id)
  console.log('blogs-newObject: ', newObject)

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  console.log('blogs-response: ', response.data)
  return response.data
}

const remove = async (id) => {
  const config = { headers: { Authorization: token } }
  //console.log('config: ', config)

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  //console.log('response: ', response.data)
  return response.data
}

const logger = { getAll, setToken, create, update, remove }
export default logger