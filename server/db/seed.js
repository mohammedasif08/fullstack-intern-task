require('dotenv').config()
const pool = require('./pool')
const bcrypt = require('bcryptjs')

const templates = [
  // Landing Pages
  { name: 'Nexus SaaS Landing', description: 'Modern SaaS landing page with hero section, features, pricing, and CTA blocks. Perfect for B2B software products.', thumbnail_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&q=80', category: 'Landing Page' },
  { name: 'Startup Launch Page', description: 'Clean startup landing page with waitlist signup, animated counters, and social proof sections.', thumbnail_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80', category: 'Landing Page' },
  { name: 'Product Hunt Launch', description: 'Optimized product launch page with video embed, feature highlights, and maker profile section.', thumbnail_url: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&q=80', category: 'Landing Page' },
  { name: 'Agency Pro Landing', description: 'Creative digital agency landing page with bold typography, portfolio preview, and contact form.', thumbnail_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80', category: 'Landing Page' },
  { name: 'Mobile App Showcase', description: 'App landing page with device mockups, feature cards, app store badges, and testimonials.', thumbnail_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80', category: 'Landing Page' },

  // Dashboards
  { name: 'Analytics Command Center', description: 'Comprehensive analytics dashboard with charts, KPI cards, date range filters, and data tables.', thumbnail_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80', category: 'Dashboard' },
  { name: 'CRM Pipeline View', description: 'Sales CRM dashboard with kanban pipeline, deal tracking, revenue charts, and team performance.', thumbnail_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80', category: 'Dashboard' },
  { name: 'Finance Tracker Pro', description: 'Personal finance dashboard with expense categories, budget tracking, and investment portfolio overview.', thumbnail_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80', category: 'Dashboard' },
  { name: 'Project Management Board', description: 'Agile project management dashboard with sprint tracking, team workload, and milestone timeline.', thumbnail_url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80', category: 'Dashboard' },
  { name: 'IoT Device Monitor', description: 'Real-time IoT dashboard for device monitoring, alerts, sensor data visualization, and remote control.', thumbnail_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80', category: 'Dashboard' },

  // E-commerce
  { name: 'Luxe Fashion Store', description: 'Premium fashion e-commerce with editorial product pages, lookbook gallery, and checkout flow.', thumbnail_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', category: 'E-commerce' },
  { name: 'Digital Products Shop', description: 'Marketplace for digital goods — templates, fonts, icons — with instant download and licensing.', thumbnail_url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80', category: 'E-commerce' },
  { name: 'Grocery Delivery App', description: 'Grocery e-commerce UI with category browsing, cart, delivery slot selection, and order tracking.', thumbnail_url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80', category: 'E-commerce' },
  { name: 'Electronics Megastore', description: 'Full-featured electronics store with product comparison, specs table, reviews, and flash deals.', thumbnail_url: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&q=80', category: 'E-commerce' },
  { name: 'Artisan Marketplace', description: 'Handmade goods marketplace with seller profiles, product stories, custom orders, and reviews.', thumbnail_url: 'https://images.unsplash.com/photo-1495435798646-a289417943b2?w=600&q=80', category: 'E-commerce' },

  // Portfolios
  { name: 'Developer Portfolio Dark', description: 'Minimal dark portfolio for developers with skills matrix, GitHub stats, project cards, and blog.', thumbnail_url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80', category: 'Portfolio' },
  { name: 'Creative Studio Folio', description: 'Bold designer portfolio with full-screen project showcases, case studies, and client list.', thumbnail_url: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80', category: 'Portfolio' },
  { name: 'Photographer Showcase', description: 'Elegant photography portfolio with masonry grid, lightbox gallery, series albums, and print shop.', thumbnail_url: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&q=80', category: 'Portfolio' },
  { name: 'Illustrator Gallery', description: 'Colorful illustrator portfolio with animated SVGs, style categories, commission info, and contact.', thumbnail_url: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&q=80', category: 'Portfolio' },

  // SaaS
  { name: 'CloudSync Dashboard', description: 'File sync SaaS app UI with folder tree, sharing permissions, version history, and team collaboration.', thumbnail_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80', category: 'SaaS' },
  { name: 'Email Marketing Suite', description: 'Email campaign builder SaaS with drag-drop editor, audience segments, A/B testing, and analytics.', thumbnail_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80', category: 'SaaS' },
  { name: 'HR Management Platform', description: 'Complete HR SaaS with employee onboarding, leave management, payroll overview, and org chart.', thumbnail_url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80', category: 'SaaS' },
  { name: 'AI Writing Assistant', description: 'AI-powered writing tool SaaS with document editor, prompt library, tone controls, and history.', thumbnail_url: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80', category: 'SaaS' },
  { name: 'Video Conferencing App', description: 'Video meeting SaaS with participant grid, screen sharing controls, chat panel, and recording.', thumbnail_url: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600&q=80', category: 'SaaS' },

  // Blogs
  { name: 'Tech Insights Blog', description: 'Clean technology blog with featured articles, tag system, author profiles, newsletter signup, and dark mode.', thumbnail_url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80', category: 'Blog' },
  { name: 'Lifestyle Magazine', description: 'Editorial lifestyle blog with full-width hero images, category nav, related posts, and social sharing.', thumbnail_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', category: 'Blog' },
  { name: 'Developer Journal', description: 'Code-focused blog with syntax highlighting, table of contents, reading progress, and comment section.', thumbnail_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80', category: 'Blog' },

  // Marketing
  { name: 'Webinar Registration', description: 'High-converting webinar registration page with countdown timer, speaker bios, agenda, and replay access.', thumbnail_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', category: 'Marketing' },
  { name: 'Lead Generation Funnel', description: 'Multi-step lead gen funnel with quiz-style questions, progress bar, and personalized results page.', thumbnail_url: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&q=80', category: 'Marketing' },
  { name: 'Black Friday Campaign', description: 'Flash sale campaign page with countdown, product grid, discount badges, and urgency messaging.', thumbnail_url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80', category: 'Marketing' },
  { name: 'Referral Program Page', description: 'Referral marketing page with milestone rewards, social sharing tools, leaderboard, and status tracker.', thumbnail_url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80', category: 'Marketing' },

  // Mobile App UI
  { name: 'Fitness Tracker App', description: 'Complete fitness mobile app UI with workout plans, progress charts, exercise library, and nutrition log.', thumbnail_url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&q=80', category: 'Mobile App' },
  { name: 'Food Delivery App', description: 'Restaurant delivery app screens — home, restaurant page, cart, checkout, and order tracking map.', thumbnail_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', category: 'Mobile App' },
  { name: 'Meditation & Mindfulness', description: 'Calm meditation app with guided sessions, breathing exercises, sleep sounds, and progress journal.', thumbnail_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', category: 'Mobile App' },
  { name: 'Travel Planner App', description: 'Trip planning mobile app with itinerary builder, map integration, expense splitter, and packing list.', thumbnail_url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&q=80', category: 'Mobile App' },

  // Admin Panels
  { name: 'Super Admin Dashboard', description: 'Full-featured admin panel with user management, role permissions, audit logs, and system health metrics.', thumbnail_url: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=600&q=80', category: 'Admin Panel' },
  { name: 'Content Management System', description: 'CMS admin with post editor, media library, SEO settings, scheduling, and multi-author workflow.', thumbnail_url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&q=80', category: 'Admin Panel' },
  { name: 'Subscription Manager', description: 'Billing admin panel with subscription plans, invoice management, payment history, and MRR charts.', thumbnail_url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80', category: 'Admin Panel' },
]

async function seed() {
  const client = await pool.connect()
  try {
    console.log('🌱 Starting seed...')
    
    // Clear existing data
    await client.query('DELETE FROM favorites')
    await client.query('DELETE FROM templates')
    await client.query('DELETE FROM users')
    await client.query('ALTER SEQUENCE templates_id_seq RESTART WITH 1')
    await client.query('ALTER SEQUENCE users_id_seq RESTART WITH 1')

    // Insert templates
    for (const tmpl of templates) {
      await client.query(
        'INSERT INTO templates (name, description, thumbnail_url, category) VALUES ($1, $2, $3, $4)',
        [tmpl.name, tmpl.description, tmpl.thumbnail_url, tmpl.category]
      )
    }
    console.log(`✅ Inserted ${templates.length} templates`)

    // Insert demo user
    const hashedPw = await bcrypt.hash('demo123', 10)
    await client.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3)',
      ['Demo User', 'demo@templatevault.com', hashedPw]
    )
    console.log('✅ Created demo user: demo@templatevault.com / demo123')
    
    console.log('🎉 Seed complete!')
  } catch (err) {
    console.error('❌ Seed failed:', err)
    throw err
  } finally {
    client.release()
    await pool.end()
  }
}

seed()
