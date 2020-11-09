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

export function addProofOfPaymentFull(id, data) {
  return axios.instance.put(`/orders/${id}/add-proof-full`, data, {
    'Content-Type': 'multipart/form-data',
  })
}

export function received(id, data) {
  return axios.instance.put(`/orders/${id}/received`, data)
}
