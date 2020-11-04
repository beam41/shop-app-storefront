import axios from './axios'

export function getDistributionMethods() {
  return axios.instance.get(`/distributionmethods`)
}
