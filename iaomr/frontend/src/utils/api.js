import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// Request interceptor – attach token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('iaomr_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor – handle 401
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('iaomr_token')
      delete api.defaults.headers.common['Authorization']
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api
