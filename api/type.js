import axios from './axios'

export function getAllType() {
  return axios.instance.get(`/types`)
}
