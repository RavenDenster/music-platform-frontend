import axios from 'axios'

export const SERVER_URL = `https://music-platform-backend-delta.vercel.app/`
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