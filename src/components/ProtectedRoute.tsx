import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux.ts'

type ProtectedRouteProps = {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}
