import axios from './axios'

export function placeBuildOrder(data) {
  return axios.instance.post(`/buildorders`, data, {
    'Content-Type': 'multipart/form-data',
  })
}

export function getBuildOrders() {
  return axios.instance.get(`/buildorders/list`)
}

export function getBuildOrderById(id) {
  return axios.instance.get(`/buildorders/${id}`)
}

export function addProofOfPaymentDeposit(id, data) {
  return axios.instance.put(`/buildorders/${id}/add-proof-deposit`, data, {
    'Content-Type': 'multipart/form-data',
  })
}

export function addProofOfPaymentFull(id, data) {
  return axios.instance.put(`/buildorders/${id}/add-proof-full`, data, {
    'Content-Type': 'multipart/form-data',
  })
}

export function received(id, data) {
  return axios.instance.put(`/buildorders/${id}/received`, data)
}

export function cancelled(id) {
  return axios.instance.put(`/buildorders/${id}/cancelled/user`)
}
