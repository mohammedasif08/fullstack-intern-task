// This is used for the frontend mock/seeding reference
// The actual data lives in the backend seed
export const CATEGORIES = [
  'All',
  'Landing Page',
  'Dashboard',
  'E-commerce',
  'Portfolio',
  'SaaS',
  'Blog',
  'Marketing',
  'Mobile App',
  'Admin Panel',
]

export const CATEGORY_COLORS = {
  'Landing Page': 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
  'Dashboard': 'bg-violet-500/20 text-violet-300 border border-violet-500/30',
  'E-commerce': 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  'Portfolio': 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  'SaaS': 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
  'Blog': 'bg-pink-500/20 text-pink-300 border border-pink-500/30',
  'Marketing': 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
  'Mobile App': 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
  'Admin Panel': 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
}

export const getCategoryColor = (category) => {
  return CATEGORY_COLORS[category] || 'bg-slate-500/20 text-slate-300 border border-slate-500/30'
}
