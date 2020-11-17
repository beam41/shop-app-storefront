import axios from './axios'

export function placeBuildOrder(data) {
  return axios.instance.post(`/buildorders`, data, {
    'Content-Type': 'multipart/form-data',
  })
}

export function getBuildOrders() {
  return axios.instance.get(`/buildorders/list`)
}
