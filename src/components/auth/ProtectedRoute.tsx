import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-teal-600"></div>
      </div>
    )
  }

  return user ? <Outlet /> : <Navigate to="/" replace />
}