import axios from './axios'

export function createOrder(data) {
  return axios.instance.post(`/orders/new`, data)
}

export function getOrderById(id) {
  return axios.instance.get(`/orders/${id}`)
}
