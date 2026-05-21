import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import TemplateCard from '../components/TemplateCard'

function SkeletonCard() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="skeleton h-44 w-full" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-full" />
      </div>
    </div>
  )
}

export default function Favorites() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get('/api/favorites')
        setFavorites(res.data.favorites || res.data)
      } catch (err) {
        setError('Failed to load favorites.')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const handleFavoriteToggle = (templateId, isFav) => {
    if (!isFav) {
      setFavorites(prev => prev.filter(t => t.id !== templateId))
    }
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="bg-mesh relative overflow-hidden">
        <div className="absolute top-0 right-1/3 w-80 h-80 bg-rose-600/8 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/30">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-white">My Favorites</h1>
          </div>
          <p className="text-slate-400 font-body mt-2">
            {!loading && (
              favorites.length > 0 
                ? `You have saved ${favorites.length} template${favorites.length !== 1 ? 's' : ''}`
                : 'Your saved templates will appear here'
            )}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-slate-400 font-body">{error}</p>
          </div>
        ) : favorites.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 rounded-3xl bg-white/4 border border-white/8 flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </div>
            <h3 className="font-heading font-semibold text-slate-200 text-2xl mb-3">No favorites yet</h3>
            <p className="text-slate-500 font-body text-sm mb-8 max-w-sm mx-auto leading-relaxed">
              Explore our collection and save templates you love by clicking the heart icon.
            </p>
            <Link to="/templates" className="btn-primary inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
              Browse Templates
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {favorites.map(template => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isFavorited={true}
                  onFavoriteToggle={handleFavoriteToggle}
                />
              ))}
            </div>

            {/* Footer CTA */}
            <div className="text-center mt-12">
              <Link to="/templates" className="btn-secondary inline-flex items-center gap-2 text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                </svg>
                Discover More Templates
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
