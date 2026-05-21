import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const STATS = [
  { label: 'Templates', value: '35+' },
  { label: 'Categories', value: '9' },
  { label: 'Developers', value: '10K+' },
  { label: 'Free Forever', value: '100%' },
]

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm10 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4z"/>
      </svg>
    ),
    title: 'Premium Quality',
    desc: 'Every template is crafted by professional designers with pixel-perfect attention to detail.',
    color: 'from-indigo-500 to-violet-600',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    ),
    title: 'Save Favorites',
    desc: 'Bookmark templates you love and access them instantly from your personal collection.',
    color: 'from-rose-500 to-pink-600',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
      </svg>
    ),
    title: 'Smart Filters',
    desc: 'Filter by category, search by name — find exactly what you need in seconds.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
      </svg>
    ),
    title: 'Secure Auth',
    desc: 'JWT-powered authentication keeps your account and favorites private and secure.',
    color: 'from-emerald-500 to-teal-600',
  },
]

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen pt-16 overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        {/* Background effects */}
        <div className="absolute inset-0 bg-mesh" />
        <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-indigo-600/15 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-violet-600/12 rounded-full blur-[100px] animate-float" style={{animationDelay: '-3s'}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass border border-indigo-500/25 rounded-full px-4 py-2 mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-sm text-slate-300 font-body">Premium templates, completely free</span>
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </div>

            {/* Headline */}
            <h1 className="font-heading font-bold text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-[1.1] animate-slide-up">
              The template store
              <br />
              <span className="gradient-text">built for builders</span>
            </h1>

            <p className="text-slate-400 font-body text-xl leading-relaxed mb-10 max-w-2xl mx-auto animate-slide-up" style={{animationDelay: '0.1s'}}>
              Browse 35+ professionally designed templates across 9 categories. 
              Save your favorites and ship your next project faster.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{animationDelay: '0.2s'}}>
              <Link to="/templates" className="btn-primary text-base py-3.5 px-8 inline-flex items-center gap-2">
                Browse Templates
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </Link>
              {!user && (
                <Link to="/register" className="btn-secondary text-base py-3.5 px-8">
                  Create free account
                </Link>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 animate-fade-in" style={{animationDelay: '0.3s'}}>
              {STATS.map(stat => (
                <div key={stat.label} className="glass rounded-2xl p-4 border border-white/8">
                  <div className="font-heading font-bold text-2xl text-white mb-0.5">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-body">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
              Everything you need to{' '}
              <span className="gradient-text">move fast</span>
            </h2>
            <p className="text-slate-400 font-body max-w-xl mx-auto">
              A curated platform designed to help developers and designers find, save, and ship faster.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((feat, i) => (
              <div
                key={feat.title}
                className="glass glass-hover rounded-2xl p-6"
                style={{animationDelay: `${i * 0.1}s`}}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  {feat.icon}
                </div>
                <h3 className="font-heading font-semibold text-slate-100 mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-500 font-body leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-12 text-center relative overflow-hidden border border-indigo-500/15">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-4">
                Ready to start building?
              </h2>
              <p className="text-slate-400 font-body mb-8 max-w-lg mx-auto">
                Join thousands of developers who use TemplateVault to ship projects faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={user ? '/templates' : '/register'} className="btn-primary text-base py-3.5 px-8">
                  {user ? 'Browse Templates' : 'Get Started Free'}
                </Link>
                {user && (
                  <Link to="/favorites" className="btn-secondary text-base py-3.5 px-8">
                    My Favorites
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9"/>
                <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.6"/>
                <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.6"/>
                <rect x="10" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9"/>
              </svg>
            </div>
            <span className="font-heading font-bold text-sm text-slate-400">TemplateVault</span>
          </div>
          <p className="text-xs text-slate-600 font-body">© 2024 TemplateVault. Built with React + Node.js</p>
          <div className="flex gap-4">
            <Link to="/templates" className="text-xs text-slate-600 hover:text-slate-400 font-body transition-colors">Templates</Link>
            {!user && <Link to="/login" className="text-xs text-slate-600 hover:text-slate-400 font-body transition-colors">Sign In</Link>}
          </div>
        </div>
      </footer>
    </div>
  )
}
