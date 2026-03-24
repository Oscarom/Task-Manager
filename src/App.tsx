import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { rehydrateAuth } from './features/auth/authSlice.ts'
import { readStoredUser } from './features/auth/authStorage.ts'
import { useAppDispatch } from './hooks/redux.ts'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import DashboardPage from './pages/DashboardPage.tsx'
import LoginPage from './pages/LoginPage.tsx'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const user = readStoredUser()
    if (user) {
      dispatch(rehydrateAuth(user))
    }
  }, [dispatch])

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
