import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import TemplateCard from '../components/TemplateCard'
import { CATEGORIES } from '../utils/categories'
import { useAuth } from '../context/AuthContext'

function SkeletonCard() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="skeleton h-44 w-full" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-2/3" />
      </div>
    </div>
  )
}

export default function Templates() {
  const { user } = useAuth()
  const [templates, setTemplates] = useState([])
  const [favorites, setFavorites] = useState(new Set())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [tmplRes] = await Promise.all([
          axios.get('/api/templates'),
        ])
        setTemplates(tmplRes.data.templates || tmplRes.data)

        if (user) {
          const favRes = await axios.get('/api/favorites')
          const favSet = new Set((favRes.data.favorites || favRes.data).map(f => f.id))
          setFavorites(favSet)
        }
      } catch (err) {
        setError('Failed to load templates. Please try again.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user])

  const handleFavoriteToggle = (templateId, isFav) => {
    setFavorites(prev => {
      const next = new Set(prev)
      isFav ? next.add(templateId) : next.delete(templateId)
      return next
    })
  }

  const filtered = useMemo(() => {
    return templates.filter(t => {
      const matchCat = activeCategory === 'All' || t.category === activeCategory
      const matchSearch = !search.trim() || 
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description?.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [templates, activeCategory, search])

  // Get unique categories from actual templates
  const availableCategories = useMemo(() => {
    const cats = new Set(templates.map(t => t.category))
    return CATEGORIES.filter(c => c === 'All' || cats.has(c))
  }, [templates])

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="bg-mesh relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-600/8 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1.5 mb-4 border border-indigo-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow"></span>
              <span className="text-xs text-slate-400 font-body">{templates.length}+ Premium Templates</span>
            </div>
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-4 leading-tight">
              Find your perfect{' '}
              <span className="gradient-text">template</span>
            </h1>
            <p className="text-slate-400 font-body text-lg leading-relaxed">
              Browse our curated collection of professional templates for every use case. 
              Save favorites and ship faster.
            </p>
          </div>

          {/* Search */}
          <div className="relative mt-8 max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search templates, categories..."
              className="input-field pl-11 pr-4"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-8">
          {availableCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-heading font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25'
                  : 'glass text-slate-400 hover:text-white hover:bg-white/8'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-slate-500 font-body">
            {loading ? 'Loading...' : (
              <>
                Showing <span className="text-white font-medium">{filtered.length}</span> templates
                {search && <> for "<span className="text-indigo-400">{search}</span>"</>}
              </>
            )}
          </p>
          {!user && (
            <p className="text-xs text-slate-600 font-body hidden md:block">
              <span className="text-indigo-400">Sign in</span> to save favorites
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
            </div>
            <p className="text-slate-400 font-body">{error}</p>
            <button onClick={() => window.location.reload()} className="btn-primary mt-4 text-sm">
              Try Again
            </button>
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-white/4 flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <h3 className="font-heading font-semibold text-slate-300 text-xl mb-2">No templates found</h3>
            <p className="text-slate-500 font-body text-sm">Try adjusting your search or filter</p>
            <button onClick={() => { setSearch(''); setActiveCategory('All') }} className="btn-secondary mt-4 text-sm">
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(template => (
              <TemplateCard
                key={template.id}
                template={template}
                isFavorited={favorites.has(template.id)}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
