import axios from 'axios'

// ============================================
// AXIOS INSTANCE — ek common axios "setup"
// Har API call isi se hogi — taaki baseURL,
// headers, token sab automatic lag jaye
// ============================================

const axiosInstance = axios.create({
  // .env se URL aa raha hai
  baseURL: import.meta.env.VITE_API_BASE_URL,

  headers: {
    'Content-Type': 'application/json',
  },
})

// ============================================
// REQUEST INTERCEPTOR
// Har request jaane se PEHLE ye chalega
// Hum yahan token attach karenge automatically
// ============================================
axiosInstance.interceptors.request.use((config) => {
  // localStorage se token nikalo
  const token = localStorage.getItem('token')

  // agar token hai, toh header mein laga do
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// ============================================
// RESPONSE INTERCEPTOR
// Har response aane ke BAAD ye chalega
// Agar error aaya (401 = unauthorized), 
// toh user ko logout kar do
// ============================================
axiosInstance.interceptors.response.use(
  (response) => response, // sab theek hai, response wapas bhejo
  (error) => {
    if (error.response?.status === 401) {
      // token expire ho gaya - logout karo
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance