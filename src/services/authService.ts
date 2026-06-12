import axiosInstance from './axiosInstance'
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth.types'

// ============================================
// SERVICE LAYER — sirf API calls yahan hote hain
// Redux ya Components ko pata nahi hona chahiye
// ki API kaise call hoti hai — bas function call karo!
// ============================================

// LOGIN — backend ko email+password bhejo
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/auth/login', credentials)
  return response.data
}

// REGISTER — backend ko naya user data bhejo
export const registerUser = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const response = await axiosInstance.post('/auth/register', credentials)
  return response.data
}