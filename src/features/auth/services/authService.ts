const AUTH_ENDPOINT = '/api/auth'

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthToken {
  accessToken: string
  refreshToken: string
}

export const login = async (payload: LoginPayload): Promise<AuthToken> => {
  const response = await fetch(`${AUTH_ENDPOINT}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error('Login failed')
  }
  return response.json()
}

export const logout = async (): Promise<void> => {
  const response = await fetch(`${AUTH_ENDPOINT}/logout`, {
    method: 'POST',
  })
  if (!response.ok) {
    throw new Error('Logout failed')
  }
}
