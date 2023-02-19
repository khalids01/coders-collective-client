import { retrieveToken } from '@/utils/tokenStore'
import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

const instance = axios.create({
    baseURL,
    headers: {
        common: {
            'Content-Type': 'application/json'
        }
    }
})

instance.interceptors.request.use(
    (config) => {
        const token = retrieveToken()
        if (token) {
            config.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default instance;