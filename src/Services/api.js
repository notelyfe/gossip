import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_BASEURL
})

export const apiPrivate = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    headers: {
        'Content-Type': "application/json"
    },
    withCredentials: true
})

export default api