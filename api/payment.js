import axios from './axios'

export function getPaymentMethods() {
  return axios.instance.get(`/paymentmethods`)
}
