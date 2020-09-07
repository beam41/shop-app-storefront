import axios from './axios'

export function getRecommends(amount) {
  return axios.instance.get(`/products/recommend?amount=${amount}`)
}

export function getAllTypesAndProducts(amount) {
  return axios.instance.get(`/products/type?amount=${amount}`)
}

export function getAllPromotionsAndProducts() {
  return axios.instance.get(`/products/promotion`)
}

export function getAllProductsByType(typeName) {
  return axios.instance.get(`/products/type/${typeName}`)
}

export function getProductById(id) {
  return axios.instance.get(`/products/${id}`)
}
