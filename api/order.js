import axios from './axios'

export function createOrder(data) {
  return axios.instance.post(`/orders/new`, data)
}

export function getOrders() {
  return axios.instance.get(`/orders/list`)
}

export function getOrderById(id) {
  return axios.instance.get(`/orders/${id}`)
}
