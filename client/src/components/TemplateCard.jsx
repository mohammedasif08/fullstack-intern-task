import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getCategoryColor } from '../utils/categories'
import axios from 'axios'

// Gradient thumbnail generator based on template id/name
const GRADIENTS = [
  'from-indigo-900 via-violet-900 to-purple-900',
  'from-slate-900 via-blue-950 to-indigo-950',
  'from-emerald-950 via-teal-900 to-cyan-950',
  'from-rose-950 via-pink-950 to-fuchsia-950',
  'from-amber-950 via-orange-950 to-red-950',
  'from-sky-950 via-blue-950 to-indigo-950',
  'from-violet-950 via-purple-950 to-fuchsia-950',
  'from-teal-950 via-emerald-950 to-green-950',
  'from-slate-950 via-zinc-900 to-slate-800',
  'from-red-950 via-rose-950 to-pink-950',
]

const ICONS = {
  'Landing Page': (
    <svg className="w-8 h-8 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
    </svg>
  ),
  'Dashboard': (
    <svg className="w-8 h-8 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z"/>
    </svg>
  ),
  'E-commerce': (
    <svg className="w-8 h-8 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
    </svg>
  ),
  'Portfolio': (
    <svg className="w-8 h-8 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
    </svg>
  ),
  'SaaS': (
    <svg className="w-8 h-8 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
    </svg>
  ),
  'Blog': (
    <svg className="w-8 h-8 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
    </svg>
  ),
  'Marketing': (
    <svg className="w-8 h-8 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/>
    </svg>
  ),
  'Mobile App': (
    <svg className="w-8 h-8 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
    </svg>
  ),
  'Admin Panel': (
    <svg className="w-8 h-8 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
    </svg>
  ),
}

function ThumbnailFallback({ template }) {
  const idx = (template.id - 1) % GRADIENTS.length
  const gradient = GRADIENTS[idx]
  const icon = ICONS[template.category]
  
  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center relative overflow-hidden`}>
      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }} />
      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full blur-3xl opacity-30 bg-white" />
      <div className="relative z-10 flex flex-col items-center gap-2 text-white">
        {icon || <svg className="w-8 h-8 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>}
        <span className="text-xs font-heading font-semibold opacity-60 uppercase tracking-widest">{template.category}</span>
      </div>
    </div>
  )
}

export default function TemplateCard({ template, isFavorited, onFavoriteToggle }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [favoriting, setFavoriting] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleFavorite = async (e) => {
    e.stopPropagation()
    if (!user) {
      navigate('/login')
      return
    }
    if (favoriting) return
    setFavoriting(true)
    try {
      if (isFavorited) {
        await axios.delete(`/api/favorites/${template.id}`)
      } else {
        await axios.post(`/api/favorites/${template.id}`)
      }
      onFavoriteToggle(template.id, !isFavorited)
    } catch (err) {
      console.error('Favorite error:', err)
    } finally {
      setFavoriting(false)
    }
  }

  return (
    <div className="card-template group animate-fade-in">
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        {!imgError && template.thumbnail_url ? (
          <img
            src={template.thumbnail_url}
            alt={template.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <ThumbnailFallback template={template} />
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={`badge ${getCategoryColor(template.category)} text-[10px]`}>
            {template.category}
          </span>
        </div>

        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          disabled={favoriting}
          className={`absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
            isFavorited 
              ? 'bg-rose-500/90 text-white shadow-lg shadow-rose-500/30' 
              : 'bg-black/40 backdrop-blur-sm text-slate-300 hover:bg-rose-500/80 hover:text-white opacity-0 group-hover:opacity-100'
          } ${favoriting ? 'scale-90' : 'hover:scale-110'}`}
          title={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <svg className="w-4 h-4" fill={isFavorited ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>

        {/* Preview button on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-heading font-semibold px-4 py-2 rounded-lg hover:bg-white/25 transition-colors">
            Preview
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-heading font-semibold text-slate-100 text-sm mb-1 line-clamp-1 group-hover:text-white transition-colors">
          {template.name}
        </h3>
        <p className="text-xs text-slate-500 font-body leading-relaxed line-clamp-2">
          {template.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
            <span className="text-[10px] text-slate-500 font-body">Free</span>
          </div>
          <button
            onClick={handleFavorite}
            className={`text-xs font-heading font-medium transition-all duration-200 ${
              isFavorited 
                ? 'text-rose-400 hover:text-rose-300' 
                : 'text-indigo-400 hover:text-indigo-300'
            }`}
          >
            {isFavorited ? '♥ Saved' : '♡ Save'}
          </button>
        </div>
      </div>
    </div>
  )
}
