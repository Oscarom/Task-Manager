import { type FormEvent, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from '../features/auth/authSlice.ts'
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'
import styles from './LoginPage.module.css'

const DEMO_EMAIL = 'user@demo.com'
const DEMO_PASSWORD = 'demo123'

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth,
  )

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginStart())

    window.setTimeout(() => {
      const trimmedEmail = email.trim()
      if (trimmedEmail === DEMO_EMAIL && password === DEMO_PASSWORD) {
        dispatch(loginSuccess({ email: trimmedEmail }))
        navigate('/dashboard', { replace: true })
      } else {
        dispatch(loginFailure('Invalid email or password'))
      }
    }, 1000)
  }

  return (
    <div className={styles.page}>
      <main className={styles.card}>
        <h1 className={styles.title}>Sign in</h1>
        <p className={styles.subtitle}>Use the demo account to continue.</p>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              className={styles.input}
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              className={styles.input}
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          {error ? (
            <p className={styles.error} role="alert">
              {error}
            </p>
          ) : null}

          <button
            className={styles.submit}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </main>
    </div>
  )
}
