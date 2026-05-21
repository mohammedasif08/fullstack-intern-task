import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Logo = () => (
  <div className="flex items-center gap-2.5">
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9"/>
        <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.6"/>
        <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.6"/>
        <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9"/>
      </svg>
    </div>
    <span className="font-heading font-bold text-lg text-white">
      Template<span className="gradient-text">Vault</span>
    </span>
  </div>
)

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setShowUserMenu(false)
  }, [location.pathname])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass border-b border-white/8 shadow-xl shadow-black/20' 
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <Logo />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link 
                to="/templates" 
                className={`nav-link text-sm ${isActive('/templates') ? 'active' : ''}`}
              >
                Browse Templates
              </Link>
              {user && (
                <Link 
                  to="/favorites" 
                  className={`nav-link text-sm ${isActive('/favorites') ? 'active' : ''}`}
                >
                  My Favorites
                </Link>
              )}
            </div>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2.5 glass rounded-xl px-3 py-2 hover:bg-white/8 transition-all duration-200 group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-heading font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-slate-300 font-body">{user.name}</span>
                    <svg className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 top-12 w-52 glass rounded-2xl shadow-2xl shadow-black/40 border border-white/10 overflow-hidden animate-slide-up">
                      <div className="p-3 border-b border-white/8">
                        <p className="text-xs text-slate-500 font-body">Signed in as</p>
                        <p className="text-sm text-slate-200 font-heading font-medium truncate">{user.email}</p>
                      </div>
                      <div className="p-2">
                        <Link to="/favorites" className="flex items-center gap-2 w-full text-left text-sm text-slate-300 hover:text-white hover:bg-white/8 rounded-lg px-3 py-2 transition-all duration-150 font-body">
                          <svg className="w-4 h-4 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                          </svg>
                          My Favorites
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full text-left text-sm text-slate-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg px-3 py-2 transition-all duration-150 font-body"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="btn-secondary text-sm py-2 px-4">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn-primary text-sm py-2 px-4">
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden glass rounded-lg p-2 text-slate-300 hover:text-white transition-colors"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden glass border-t border-white/8 animate-slide-up">
            <div className="px-4 py-4 space-y-2">
              <Link to="/templates" className="block text-sm text-slate-300 hover:text-white hover:bg-white/8 rounded-lg px-3 py-2.5 transition-all font-body">
                Browse Templates
              </Link>
              {user && (
                <Link to="/favorites" className="block text-sm text-slate-300 hover:text-white hover:bg-white/8 rounded-lg px-3 py-2.5 transition-all font-body">
                  My Favorites
                </Link>
              )}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-sm text-red-400 hover:bg-red-500/10 rounded-lg px-3 py-2.5 transition-all font-body"
                >
                  Sign Out
                </button>
              ) : (
                <div className="flex gap-2 pt-2">
                  <Link to="/login" className="flex-1 text-center btn-secondary text-sm py-2">Sign In</Link>
                  <Link to="/register" className="flex-1 text-center btn-primary text-sm py-2">Get Started</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Backdrop for user menu */}
      {showUserMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
      )}
    </>
  )
}
