import axios from 'axios'

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5173'
})

export default Api