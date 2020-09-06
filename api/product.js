import axios from './axios'

export function getRecommend(amount) {
  return axios.instance.get(`/products/recommend?amount=${amount}`)
}

export function getAllTypeAndProduct(amount) {
  return axios.instance.get(`/products/type?amount=${amount}`)
}

export function getAllPromotionAndProduct() {
  return axios.instance.get(`/products/promotion`)
}

export function getProductByType(typeName) {
  return axios.instance.get(`/products/type/${typeName}`)
}
