import type { AuthUser } from './authSlice.ts'

export const AUTH_STORAGE_KEY = 'task-manager-auth'

export function readStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (
      parsed &&
      typeof parsed === 'object' &&
      'email' in parsed &&
      typeof (parsed as { email: unknown }).email === 'string'
    ) {
      return { email: (parsed as { email: string }).email }
    }
  } catch {
    // ignore invalid JSON or storage errors
  }
  return null
}
