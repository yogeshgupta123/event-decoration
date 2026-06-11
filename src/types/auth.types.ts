export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'customer' | 'vendor' | 'admin'
  avatar?: string
  createdAt: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  name: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}