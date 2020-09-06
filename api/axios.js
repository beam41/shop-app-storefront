import _axios from 'axios'

/** @type {{instance: import('axios').AxiosInstance}} */
const axios = { instance: null }

export const createInstance = ({ store }) => {
  axios.instance = _axios.create({
    baseURL: process.env.endpoint,
  })
}

export default axios
