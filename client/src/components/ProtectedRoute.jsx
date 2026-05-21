import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center animate-pulse">
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9"/>
              <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.6"/>
              <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.6"/>
              <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9"/>
            </svg>
          </div>
          <p className="text-slate-500 text-sm font-body">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname, message: 'Please sign in to view your favorites.' }} replace />
  }

  return children
}
