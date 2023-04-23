import axios from 'axios'
// https://music-platform-backend-delta.vercel.app/
// http://localhost:5000/
// https://music-platform-backend.onrender.com/

export const SERVER_URL = `https://music-platform-backend.onrender.com/`
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