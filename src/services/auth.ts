import api from '../lib/axios'
import { AuthTokens, User } from '../types'

const TOKEN_KEYS = {
  access: 'access_token',
  refresh: 'refresh_token',
} as const

export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_KEYS.access)
}

export function isAuthenticated(): boolean {
  return !!getAccessToken()
}

function saveTokens(tokens: AuthTokens): void {
  localStorage.setItem(TOKEN_KEYS.access, tokens.access)
  localStorage.setItem(TOKEN_KEYS.refresh, tokens.refresh)
}

function clearTokens(): void {
  localStorage.removeItem(TOKEN_KEYS.access)
  localStorage.removeItem(TOKEN_KEYS.refresh)
}

export async function login(email: string, password: string): Promise<AuthTokens> {
  const { data } = await api.post<AuthTokens>('/token/', { email, password })
  saveTokens(data)
  return data
}

// TODO: Backend endpoint /auth/register/ needs to be added
export async function register(email: string, password: string, fullName: string): Promise<User> {
  const { data } = await api.post<User>('/auth/register/', {
    email,
    password,
    full_name: fullName,
  })
  return data
}

export function logout(): void {
  clearTokens()
}
