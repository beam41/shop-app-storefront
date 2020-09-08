import axios from './axios'

export function checkUserExist(username) {
  return axios.instance.get(`/users/check-exist?username=${username}`)
}

export function login(username, password) {
  return axios.instance.post(`/users/login`, { username, password })
}
