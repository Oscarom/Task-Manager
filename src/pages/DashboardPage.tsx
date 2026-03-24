import { useNavigate } from 'react-router-dom'
import { logout } from '../features/auth/authSlice.ts'
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts'
import TaskList from '../components/TaskList.tsx'
import styles from './DashboardPage.module.css'

export default function DashboardPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login', { replace: true })
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          {user ? (
            <p className={styles.welcome}>Welcome, {user.email}</p>
          ) : null}
        </div>
        <button
          type="button"
          className={styles.logout}
          onClick={handleLogout}
        >
          Log out
        </button>
      </header>

      <main className={styles.main}>
        <TaskList />
      </main>
    </div>
  )
}
