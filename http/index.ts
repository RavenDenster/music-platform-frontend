import axios from 'axios'

export const SERVER_URL = `http://localhost:5000/`
export const API_URL = `${SERVER_URL}auth`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

export default $api